import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";
import { ServiceError } from "../../errors/ServiceError.js";
import { signInService } from "../../services/auth/index.js";
import { formatErrorResponse, formatSuccessResponse } from "../../utils/format.js";
import { logError } from "../../errors/log.js";

export const signInController = createTypedAPIHandler("/api/auth/signin", "post")(async (req, res) => {
  const reply = createTypedReply(res, "/api/auth/signin", "post");

  try {
    const { user } = await signInService(req.body);

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.clientPrefsKey = user.clientPrefsKey;
    req.session.sessionVersion = user.sessionVersion;
    req.session.lastActiveAt = user.lastActiveAt;
    await req.session.save();
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        error.status === 401 ? 401 : 400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "signInController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, formatSuccessResponse('サインインに成功しました'));
});
