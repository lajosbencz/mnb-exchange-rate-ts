import {Response} from '../response';

export type GetCurrenciesResponse = Response & {
  Currencies: string[];
};
