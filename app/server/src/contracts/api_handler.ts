import type { RequestHandler, Response } from "express";
import type { Paths } from "./types.js";

type HttpMethod = "get" | "put" | "post" | "delete";
type MethodOf<Path> = Extract<keyof Path, HttpMethod>;
type ResponsesOf<Op> = Op extends { responses: infer R }
  ? (R extends Record<number, any> ? R : never)
  : never;
type JsonBodyResponseOf<R> = R extends { content: { "application/json": infer B } } ? B : never;
type JsonBodyRequestOf<Op> = Op extends { requestBody: { content: { "application/json": infer B } } } ? B : never;

export function createTypedAPIHandler<
  ApiPath extends keyof Paths,
  Method extends MethodOf<Paths[ApiPath]>,
  Op extends Paths[ApiPath][Method] = Paths[ApiPath][Method],
  Params = Paths[ApiPath][Method] extends { parameters: { path: infer P } } ? P : object,
  Query = Paths[ApiPath][Method] extends { parameters: { query: infer Q } } ? Q : object
>(_path: ApiPath, _method: Method) {
  return (
    handler: RequestHandler<
      Params,
      // レスポンスは複数種類あるためreply側で処理します
      unknown,
      JsonBodyRequestOf<Op>,
      Query
    >
  ) : typeof handler => {
    return handler;
  };
};

export type ReplyFn<Resp extends Record<number, any>> = <Status extends keyof Resp>(
  status: Status,
  body: JsonBodyResponseOf<Resp[Status]>
) => void;

export function createTypedReply<
  ApiPath extends keyof Paths,
  Method extends MethodOf<Paths[ApiPath]>,
  Op extends Paths[ApiPath][Method] = Paths[ApiPath][Method],
  Resp extends Record<number, any> = ResponsesOf<Op>
>(res: Response, _path: ApiPath, _method: Method): ReplyFn<Resp> {
  return (status, body) => {
    res.status(status as number).json(body);
  };
};
