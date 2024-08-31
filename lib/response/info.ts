import {Response} from '../response';

export type GetInfoResponse = Response & {
  FirstDate: string;
  LastDate: string;
  Currencies: string[];
};
