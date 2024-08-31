import {Response} from '../response';

export type GetCurrencyUnitsResponse = Response & {
  [key: string]: number;
};
