import { ENV_LOCAL } from "../constants/env.const.js";

export function isLocal (): boolean {
  return process.env.CURRENT_ENV === ENV_LOCAL;
};

