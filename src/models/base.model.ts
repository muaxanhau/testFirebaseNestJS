import { Prettify } from 'src/utils';

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
export type FirestoreIdBaseModel<T> = Prettify<{ id: string } & T>;

export type ResponseBaseModel<T = null> = Prettify<{
  data: T;
  code: number;
  message: string;
}>;
