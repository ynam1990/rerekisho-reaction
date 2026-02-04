import { ServiceError } from "../errors/ServiceError.js";
import { redis } from "../utils/redis.js";

const rateLimitLuaScripts = {
  // リセット
  resetByKeys: `
    redis.call("DEL", KEYS[1])
    redis.call("DEL", KEYS[2])
    return 1
  `,
  // ロック状態のチェック
  checkIsLocked: `
    local lockKey = KEYS[1]
    local ttl = redis.call("TTL", lockKey)
    
    if ttl and ttl > 0 then
      -- ロック中
      return 1
    end
    
    -- ロック無し
    return 0
  `,
  // 失敗のカウント
  countFail: `
    local countKey = KEYS[1]
    local lockKey = KEYS[2]
    local lockSeconds = tonumber(ARGV[1])
    local maxCount = tonumber(ARGV[2])

    local ttl = redis.call("TTL", lockKey)
    if ttl and ttl > 0 then
      -- 既にロック中
      return 1
    end

    -- 試行回数を加算
    local fails = redis.call("INCR", countKey)
    redis.call("EXPIRE", countKey, lockSeconds)

    if fails >= maxCount then
      -- ロックを作る
      redis.call("SET", lockKey, "1", "EX", lockSeconds)
      return 1
    end

    return 0
  `,
} as const;

const toKeys = (apiName: string, identifier: string) => {
  return {
    countKey: `${ apiName }:counts:${ identifier }`,
    lockKey: `${ apiName }:lock:${ identifier }`,
  };
};

export const recordTryCount = async (
  apiName: string,
  identifier: string,
  blockMinutes: number,
  maxCount: number
) => {
  const { countKey, lockKey } = toKeys(apiName, identifier);

  const isLocked = !!(await redis.eval(
    rateLimitLuaScripts.countFail,
    2,
    countKey,
    lockKey,
    String(blockMinutes * 60),
    String(maxCount),
  ));

  return { locked: isLocked };
};

export const clearTryCount = async (apiName: string, identifier: string) => {
  const { countKey, lockKey } = toKeys(apiName, identifier);
  await redis.eval(rateLimitLuaScripts.resetByKeys, 2, countKey, lockKey);
}

export const assertNotLocked = async (
  apiName: string,
  identifier: string,
  blockMinutes: number,
) => {
  const { lockKey } = toKeys(apiName, identifier);
  const isLocked = !!(
    await redis.eval(rateLimitLuaScripts.checkIsLocked, 1, lockKey)
  );

  if (isLocked) {
    throw new ServiceError(
      'TOO_MANY_REQUESTS',
      `連続回数の上限を超えたためロックされています。${ blockMinutes }分経過してからお試しください`
    );
  }
};
