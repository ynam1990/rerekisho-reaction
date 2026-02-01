import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";

export const getMeController = createTypedAPIHandler("/api/auth/me", "get")((req, res) => {
  const reply = createTypedReply("/api/auth/me", "get");

  const { userId, username } = req.session;
  const isAuthenticated = !!(userId && username);

  if (isAuthenticated) {
    return reply(res, 200, {
      username,
      ok: true,
    });  
  } else {
    return reply(res, 401, {
      code: 401,
      message: "Unauthorized",
      ok: false,
    });
  }
});
