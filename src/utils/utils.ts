export const returnResponse = <T>(data: T) => {};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type { Prettify };
