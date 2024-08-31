import {Response} from '../response';

export type GetExchangeRatesResponse = Response & {
  [key: string]: {
    [key: string]: number;
  };
};
