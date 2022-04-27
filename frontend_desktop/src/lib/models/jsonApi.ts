export interface IJsonApiData<T> {
  type: string;
  attributes: T;
}
export interface IJsonApiBase<T> {
  resources: string;
  data: IJsonApiData<T>[];
}

interface SuccessResponse {
  message: string;
}

export type JsonApiSuccessResponse = IJsonApiBase<SuccessResponse>;
