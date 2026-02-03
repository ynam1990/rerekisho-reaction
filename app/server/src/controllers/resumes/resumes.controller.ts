import { createTypedAPIHandler, createTypedReply } from "../../contracts/api_handler.js";
import { logError } from "../../errors/log.js";
import { ServiceError } from "../../errors/ServiceError.js";
import { getResumesService, getResumeService, postResumeService, deleteResumeService } from "../../services/resumes/index.js";
import { formatErrorResponse } from "../../utils/format.js";

export const getResumesController = createTypedAPIHandler("/api/resumes", "get")(async (req, res) => {
  const reply = createTypedReply(res, "/api/resumes", "get");

  let resumes;
  try {
    const { resumeList } = await getResumesService({
      userId: req.session.userId!,
    });
    resumes = resumeList;
  } catch (error) {
    logError(error, "getResumesController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, resumes);
});

export const getResumeController = createTypedAPIHandler("/api/resumes/{resumeId}", "get")(async (req, res) => {
  const reply = createTypedReply(res, "/api/resumes/{resumeId}", "get");

  let resumeData;
  try {
    const { resume } = await getResumeService({
      userId: req.session.userId!,
      resumeId: req.params.resumeId,
    });
    resumeData = resume;
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "getResumeController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, resumeData);
});

export const postResumeController = createTypedAPIHandler("/api/resumes", "post")(async (req, res) => {
  const reply = createTypedReply(res, "/api/resumes", "post");

  let result;
  try {
    result = await postResumeService({
      userId: req.session.userId!,
      resume: req.body,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "postResumeController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, {
    ok: true,
    message: '履歴書を保存しました',
    resumeId: result.resumeId,
    updatedAt: result.updatedAt,
  });
});

export const deleteResumeController = createTypedAPIHandler("/api/resumes/{resumeId}", "delete")(async (req, res) => {
  const reply = createTypedReply(res, "/api/resumes/{resumeId}", "delete");

  let result;
  try {
    result = await deleteResumeService({
      userId: req.session.userId!,
      resumeId: req.params.resumeId,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return reply(
        400,
        formatErrorResponse(error.message)
      );
    }

    logError(error, "deleteResumeController");
    return reply(500, formatErrorResponse('サーバーで予期しないエラーが発生しました', 500));
  }

  return reply(200, {
    ok: true,
    message: '履歴書を削除しました',
    resumeId: result.resumeId,
  });
});
