import { config } from 'src/config';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

const getBaseUrl = (request: Request) => {
  const host = request.headers['host'] as string;
  let baseUrl = `${host}${config.prefix}/`;
  if (!baseUrl.includes('http')) {
    baseUrl = `http://${baseUrl}`;
  }
  return baseUrl;
};

export const utils = {
  getBaseUrl,
};

export type { Prettify };
