import {Request} from '../request';

export type GetCurrencyUnitsRequest = Request & {
  currencies: string[];
};
