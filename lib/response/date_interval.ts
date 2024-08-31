import {Response} from '../response';

export type GetDateIntervalResponse = Response & {
  FirstDate: string;
  LastDate: string;
};
