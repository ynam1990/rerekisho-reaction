import type { RequestHandler, Response } from "express";
import type { Paths } from "./types.js";

type HttpMethod = "get" | "put" | "post" | "delete";
type MethodOf<Path> = Extract<keyof Path, HttpMethod>;
type ResponsesOf<Op> = Op extends { responses: infer R }
  ? (R extends Record<number, any> ? R : never)
  : never;
type JsonBodyResponseOf<R> = R extends { content: { "application/json": infer B } } ? B : never;

export function createTypedHandler<
  apiPath extends keyof Paths,
  method extends keyof Paths[apiPath]
>(
  handler: RequestHandler<
    Paths[apiPath][method] extends { parameters: { path: infer P } }
      ? P
      : {},
    // レスポンスはreply側で処理します
    unknown,
    Paths[apiPath][method] extends { requestBody: { content: { "application/json": infer B } } }
      ? B
      : never,
    Paths[apiPath][method] extends { parameters: { query: infer Q } }
      ? Q
      : {}
  >
): typeof handler
{
  return handler;
};

export type ReplyFn<Resp extends Record<number, any>> = <Status extends keyof Resp>(
  res: Response,
  status: Status,
  body: JsonBodyResponseOf<Resp[Status]>
) => void;

export function createReply<
  ApiPath extends keyof Paths,
  Method extends MethodOf<Paths[ApiPath]>,
  Op extends Paths[ApiPath][Method] = Paths[ApiPath][Method],
  Resp extends Record<number, any> = ResponsesOf<Op>
>(_path: ApiPath, _method: Method): ReplyFn<Resp> {
  return (res, status, body) => {
    res.status(status as number).json(body);
  };
};
