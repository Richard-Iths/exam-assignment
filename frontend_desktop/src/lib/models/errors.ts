export interface ErrorResponse extends Error {
  statusCode: ErrorCodes;
}
export enum ErrorCodes {
  EMPTY_CONFIG_FILE = "200",
}
