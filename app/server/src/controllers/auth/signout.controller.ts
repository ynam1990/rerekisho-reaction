import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";
import { signOutService } from "../../services/auth/index.js";
import { formatErrorResponse, formatSuccessResponse } from "../../utils/format.js";
import { logError } from "../../errors/log.js";
import { destroySessionAsync } from "../../utils/async_session.js";

export const signOutController = createTypedAPIHandler("/api/auth/signout", "post")(async (req, res) => {
  const reply = createTypedReply(res, "/api/auth/signout", "post");

  try {
    await signOutService({
      userId: req.session.userId!,
    });

    // セッション削除
    await destroySessionAsync(req.session);
  } catch (error) {
    logError(error, "signOutController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, formatSuccessResponse('サインアウトが完了しました'));
});
