import {Request} from '../request';

export type GetExchangeRatesRequest = Request & {
  startDate: string;
  endDate: string;
  currencies: string[];
};
