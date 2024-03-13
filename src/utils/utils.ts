type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export const utils = {};

export type { Prettify };
