export interface IJsonResponse<T> {
  data: T;
}

export interface IJsonErrorResponse<T> {
  error: T;
}
