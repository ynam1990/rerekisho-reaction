import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";

export const getMeController = createTypedAPIHandler("/api/auth/me", "get")((req, res) => {
  const reply = createTypedReply(res, "/api/auth/me", "get");

  const { userId, username } = req.session;
  const isAuthenticated = !!(userId && username);

  if (isAuthenticated) {
    return reply(200, {
      username,
      ok: true,
    });  
  } else {
    return reply(401, {
      code: 401,
      message: "Unauthorized",
      ok: false,
    });
  }
});
