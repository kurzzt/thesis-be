export interface TransformResponse {
  statusCode: number;
  data: any[];
  included?: any[];
  count?: number;
  meta?: any;
}

export interface TransformApiResource {
  id: string;
  type: string;
  attributes: { [key: string]: any };
}
