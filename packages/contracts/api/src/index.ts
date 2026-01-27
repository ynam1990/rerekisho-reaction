import type { paths, components, operations } from "../generated/openapi";

export type Paths = paths;
export type Components = components;
export type Operations = operations;

export type Schemas = Components["schemas"];

export type AuthenticationData = Schemas["AuthenticationData"];
export type AuthenticationDataWithAgreement = Schemas["AuthenticationDataWithAgreement"];
export type ResumeListItem = Schemas["ResumeListItem"];
export type ResumeObj = Schemas["ResumeObj"];

export type Responses = Components["responses"];

export type SuccessResponse = Schemas["SuccessResponse"];
export type ErrorResponse = Schemas["ErrorResponse"];

export type UnauthorizedErrorResponse = Responses["UnauthorizedError"];
export type InternalServerErrorResponse = Responses["InternalServerError"];
