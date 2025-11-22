# MNB Exchange Rate API

[Docs - mnb.hu](https://www.mnb.hu/sajtoszoba/sajtokozlemenyek/2015-evi-sajtokozlemenyek/tajekoztatas-az-arfolyam-webservice-mukodeserol)

## Install

```bash
yarn add mnb-exchange-rate
```

## Usage

```js
import {getClient} from 'mnb-exchange-rate';

// client singleton
const client = await getClient();

// general info
const info = await client.GetInfo();

// available currencies
const currencies = await client.GetCurrencies();

// units used for per currency
const units = await client.GetCurrencyUnits({currencies: ['EUR', 'JPY']});

// range of historic data
const interval = await client.GetDateInterval();

// current exchange rate of all currencies
const rate_current = await client.GetCurrentExchangeRates();

// get exchange rate by interval and specific currencies
const rates = await client.GetExchangeRates({
  startDate: '2000-01-01',
  endDate: '2000-01-02',
  currencies: ['EUR'],
});
```

## Escape hatch to [soap](https://www.npmjs.com/package/soap) library

```js
const client = await getClient();
client.soap.addSoapHeader('X-Foo', 'bar');
```
