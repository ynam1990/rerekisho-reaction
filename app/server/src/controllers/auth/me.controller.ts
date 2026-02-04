import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";
import { logError } from "../../errors/log.js";
import { ServiceError } from "../../errors/ServiceError.js";
import { getMeService, deleteMeService } from "../../services/auth/index.js";
import { destroySessionAsync } from "../../utils/destroy_session.js";
import { formatErrorResponse, formatSuccessResponse } from "../../utils/format.js";

export const getMeController = createTypedAPIHandler("/api/auth/me", "get")(async (req, res) => {
  const reply = createTypedReply(res, "/api/auth/me", "get");

  let _username = "";
  try {
    // このControllerに到達した時点で、認証されている想定
    const { username, lastActiveAt } = await getMeService({
      userId: req.session.userId!,
      username: req.session.username!,
      lastActiveAt: req.session.lastActiveAt!,
    });
    _username = username;
  
    if (req.session.lastActiveAt !== lastActiveAt) {
      req.session.lastActiveAt = lastActiveAt;
      await req.session.save();
    }
  } catch (error) {
    logError(error, "getMeController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, {
    username: _username,
    ok: true,
  });
});

export const deleteMeController = createTypedAPIHandler("/api/auth/me", "delete")(async (req, res) => {
  const reply = createTypedReply(res, "/api/auth/me", "delete");

  try {
    // このControllerに到達した時点で、認証されている想定
    await deleteMeService({
      userId: req.session.userId!,
    });

    // セッション削除
    await destroySessionAsync(req.session);
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "deleteMeController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, formatSuccessResponse('ユーザー削除が完了しました'));
});
