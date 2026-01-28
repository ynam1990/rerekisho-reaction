import type { paths, components, operations } from "../generated/openapi";

export type Paths = paths;
export type Components = components;
export type Operations = operations;
export type Schemas = Components["schemas"];

export type AuthenticationData = Schemas["AuthenticationData"];
export type AuthenticationDataWithAgreement = Schemas["AuthenticationDataWithAgreement"];
export type ResumeListItem = Schemas["ResumeListItem"];
export type ResumeObj = Schemas["ResumeObj"];

export type SuccessResponse = Schemas["SuccessResponse"];
export type ErrorResponse = Schemas["ErrorResponse"];
export type UnauthorizedErrorResponse = Components["responses"]["UnauthorizedError"];
export type InternalServerErrorResponse = Components["responses"]["InternalServerError"];

export type APIPair<TRequestBody, TResponse> = [
  TRequestBody,
  TResponse,
];
export type PostSignUpAPIPair = [
  Paths["/api/auth/signup"]["post"]["requestBody"]["content"]["application/json"],
  Paths["/api/auth/signup"]["post"]["responses"]["200"]["content"]["application/json"],
];
export type PostSignInAPIPair = [
  Paths["/api/auth/signin"]["post"]["requestBody"]["content"]["application/json"],
  Paths["/api/auth/signin"]["post"]["responses"]["200"]["content"]["application/json"],
];
export type PostSignOutAPIPair = [
  undefined,
  Paths["/api/auth/signout"]["post"]["responses"]["200"]["content"]["application/json"],
];
export type GetMePair = [
  undefined,
  Paths["/api/auth/me"]["get"]["responses"]["200"]["content"]["application/json"],
];
export type DeleteMePair = [
  undefined,
  Paths["/api/auth/me"]["delete"]["responses"]["200"]["content"]["application/json"],
];
export type GetResumesPair = [
  undefined,
  Paths["/api/resumes"]["get"]["responses"]["200"]["content"]["application/json"],
];
export type PostResumePair = [
  undefined,
  Paths["/api/resumes"]["post"]["responses"]["200"]["content"]["application/json"],
];
export type GetResumePair = [
  undefined,
  Paths["/api/resumes/{resumeId}"]["get"]["responses"]["200"]["content"]["application/json"],
];
export type PutResumePair = [
  Paths["/api/resumes/{resumeId}"]["put"]["requestBody"]["content"]["application/json"],
  Paths["/api/resumes/{resumeId}"]["put"]["responses"]["200"]["content"]["application/json"],
];
export type DeleteResumePair = [
  undefined,
  Paths["/api/resumes/{resumeId}"]["delete"]["responses"]["200"]["content"]["application/json"],
];
