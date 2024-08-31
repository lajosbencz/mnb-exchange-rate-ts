import {Response} from '../response';

export type GetCurrentExchangeRatesResponse = Response & {
  [key: string]: {
    [key: string]: number;
  };
};
