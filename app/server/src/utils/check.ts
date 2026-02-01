import { NODE_ENV, ENV_DEV, ENV_PROD } from "../constants/env.const.js";

export function isDev (): boolean {
  return NODE_ENV === ENV_DEV;
};

export function isProd (): boolean {
  return NODE_ENV === ENV_PROD;
};
