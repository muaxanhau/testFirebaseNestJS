export type ExceptionResponseBaseModel = {
  statusCode: number;
  method: string;
  path: string;
  timestamp: Date;
  message: string | string[];
};
/**
 * response collection for firebase model
 */
export type FirestoreIdBaseModel<T> = { id: string } & T;
