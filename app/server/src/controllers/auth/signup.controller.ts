import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";
import { formatErrorResponse, formatSuccessResponse } from "../../utils/format.js";
import { signUpService } from "../../services/auth/index.js";
import { ServiceError } from "../../errors/ServiceError.js";
import { logError } from "../../errors/log.js";

export const signUpController = createTypedAPIHandler("/api/auth/signup", "post")(async (req, res) => {
  const reply = createTypedReply(res, "/api/auth/signup", "post");

  try {
    const { user } = await signUpService(req.body);

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.sessionVersion = user.sessionVersion;
    req.session.lastActiveAt = user.lastActiveAt;
    await req.session.save();
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        error.status === 409 ? 409 : 400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "signUpController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, formatSuccessResponse('ユーザー登録が完了しました'));
});
