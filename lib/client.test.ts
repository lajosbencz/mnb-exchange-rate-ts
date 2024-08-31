import {getClient} from './client';

function expectCurrenciesCurrList(res: any) {
  expect(res.Currencies).toBeDefined();
  expect(res.Currencies).toBeDefined();
  expect(res.Currencies.length).toBeGreaterThan(0);
  res.Currencies.forEach((c: string) => expect(c.length).toEqual(3));
}

describe('Client', () => {
  it('should be defined', async () => {
    const client = await getClient();
    expect(client).toBeDefined();
  }, 10000);
  it('should return info', async () => {
    const client = await getClient();
    const res = await client.GetInfo();
    expect(res).toBeDefined();
    expect(res.FirstDate).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(res.LastDate).toMatch(/\d{4}-\d{2}-\d{2}/);
    expectCurrenciesCurrList(res);
  }, 20000);
  it('should return currencies', async () => {
    const client = await getClient();
    const res = await client.GetCurrencies();
    expect(res).toBeDefined();
    expectCurrenciesCurrList(res);
  }, 20000);
  it('should return currency units', async () => {
    const client = await getClient();
    const currencies = ['EUR', 'HUF'];
    const res = await client.GetCurrencyUnits({currencies});
    currencies.forEach(c => {
      expect(res[c]).toBeDefined();
    });
  }, 20000);
  it('should return stored interval', async () => {
    const client = await getClient();
    const res = await client.GetDateInterval();
    expect(res).toBeDefined();
    expect(res.FirstDate).toBeDefined();
    expect(res.LastDate).toBeDefined();
  }, 20000);
  it('should return current rates', async () => {
    const client = await getClient();
    const res = await client.GetCurrentExchangeRates();
    expect(res).toBeDefined();
  }, 20000);
  it('should return exchange rates', async () => {
    const client = await getClient();
    const now = new Date();
    const startDate = new Date(new Date().setDate(now.getDate() - 5))
      .toISOString()
      .split('T')[0];
    const endDate = new Date(new Date().setDate(now.getDate() - 0))
      .toISOString()
      .split('T')[0];
    const res = await client.GetExchangeRates({
      startDate,
      endDate,
      currencies: ['EUR', 'USD'],
    });
    expect(res).toBeDefined();
    Object.values(res).forEach(d => {
      Object.values(d).forEach(n => {
        expect(n).toBeGreaterThan(0);
      });
    });
  }, 20000);
});
