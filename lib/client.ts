import {Client as SoapClient, createClientAsync} from 'soap';
import {XMLParser} from 'fast-xml-parser';
import {GetInfoResponse} from './response/info';
import {GetInfoRequest} from './request/info';
import {GetCurrenciesRequest} from './request/currencies';
import {GetCurrenciesResponse} from './response/currencies';
import {Request} from './request';
import {GetCurrencyUnitsRequest} from './request/currency_units';
import {GetCurrencyUnitsResponse} from './response/currency_units';
import {GetDateIntervalRequest} from './request/date_interval';
import {GetDateIntervalResponse} from './response/date_interval';
import {GetExchangeRatesRequest} from './request/exchange_rates';
import {GetExchangeRatesResponse} from './response/exchange_rates';
import {GetCurrentExchangeRatesRequest} from './request/current_exchange_rates';
import {GetCurrentExchangeRatesResponse} from './response/current_exchange_rates';

export const WSDL_URL = 'https://www.mnb.hu/arfolyamok.asmx?wsdl';

let _client: Client | null = null;

export async function getClient(): Promise<Client> {
  if (!_client) {
    const soapClient = await createClientAsync(WSDL_URL);
    _client = new Client(soapClient);
  }
  return _client;
}

export class Client {
  constructor(public readonly soap: SoapClient) {
  }

  protected async fetch<T>(
    name: string,
    root: string,
    input: Request = {}
  ): Promise<T> {
    const [res] = await this.soap[`${name}Async`](input);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      isArray: (tagName, jPath, isLeafNode, isAttribute) =>
        !isLeafNode && !isAttribute,
    });
    const xml = parser.parse(res[`${name}Result`]);
    return xml[root] as T;
  }

  async GetInfo(input: GetInfoRequest = {}): Promise<GetInfoResponse> {
    const [raw] = await this.fetch<any>(
      'GetInfo',
      'MNBExchangeRatesQueryValues',
      input
    );
    return {
      FirstDate: raw?.FirstDate,
      LastDate: raw?.LastDate,
      Currencies: raw?.Currencies[0]?.Curr ?? [],
    };
  }

  async GetCurrencies(
    input: GetCurrenciesRequest = {}
  ): Promise<GetCurrenciesResponse> {
    const raw = await this.fetch<any>('GetCurrencies', 'MNBCurrencies', input);
    return {
      Currencies: raw?.[0]?.Currencies?.[0]?.Curr ?? [],
    };
  }

  async GetCurrencyUnits(
    input: GetCurrencyUnitsRequest = {currencies: []}
  ): Promise<GetCurrencyUnitsResponse> {
    const raw = await this.fetch<any>('GetCurrencyUnits', 'MNBCurrencyUnits', {
      currencyNames: input.currencies.join(','),
    });
    const entries = raw?.[0]?.Units?.[0]?.Unit?.map((e: any) => [
      e['@curr'],
      parseFloat(e['#text']),
    ]);
    return Object.fromEntries(entries);
  }

  async GetDateInterval(
    input: GetDateIntervalRequest = {}
  ): Promise<GetDateIntervalResponse> {
    const raw = await this.fetch<any>(
      'GetDateInterval',
      'MNBStoredInterval',
      input
    );
    const el = raw?.[0]?.DateInterval;
    if (!el) {
      throw new Error('Invalid response');
    }
    return {
      FirstDate: el['@startdate'],
      LastDate: el['@enddate'],
    };
  }

  async GetCurrentExchangeRates(
    input: GetCurrentExchangeRatesRequest = {}
  ): Promise<GetCurrentExchangeRatesResponse> {
    const raw = await this.fetch<any>(
      'GetCurrentExchangeRates',
      'MNBCurrentExchangeRates',
      input
    );
    const el = raw?.[0]?.Day?.[0];
    if (!el) {
      throw new Error('Invalid response');
    }
    return {
      [el['@date']]: Object.fromEntries(
        el.Rate?.map((e: any) => [
          e['@curr'],
          parseFloat(e['#text']) / parseFloat(e['@unit']),
        ])
      ),
    };
  }

  async GetExchangeRates(
    input: GetExchangeRatesRequest
  ): Promise<GetExchangeRatesResponse> {
    const raw = await this.fetch<any>('GetExchangeRates', 'MNBExchangeRates', {
      startDate: input.startDate,
      endDate: input.endDate,
      currencyNames: input.currencies.join(','),
    });
    const r: GetExchangeRatesResponse = {};
    if (raw) {
      raw.forEach((n: any) => {
        n.Day.forEach((dn: any) => {
          r[dn['@date']] = {};
          dn.Rate.forEach((rn: any) => {
            r[dn['@date']][rn['@curr']] =
              parseFloat(rn['#text']) / parseFloat(rn['@unit']);
          });
        });
      });
    }
    return r;
  }
}
