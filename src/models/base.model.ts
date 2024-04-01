import { IsNotEmpty, IsString } from 'class-validator';
import { config, tokenName } from 'src/config';
// import { config, tokenName } from 'src/config';
import { Prettify } from 'src/utils';

/**
 * response collection for firebase model
 */
export type FirestoreIdBaseModel<T> = Prettify<{ id: string } & T>;

type ResponseBaseModel<T> = {
  statusCode: number;
  method: string;
  path: string;
  timestamp: Date;
  message: string[];
  data: T;
};

/**
 *
 */
export type ErrorResponseBaseModel = ResponseBaseModel<null>;

/**
 *
 */
export type SuccessResponseBaseModel<T = null> = ResponseBaseModel<T>;

export type PaginationResponseBaseModel<T> = {
  totalPage: number;
  nextPage: number;
  prevPage: number;
} & T;

export class HeadersBaseModel {
  @IsNotEmpty()
  @IsString()
  [tokenName]: string;
}
