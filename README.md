# MNB Exchange Rate API

[Docs - mnb.hu](https://www.mnb.hu/sajtoszoba/sajtokozlemenyek/2015-evi-sajtokozlemenyek/tajekoztatas-az-arfolyam-webservice-mukodeserol)

## Install

```bash
yarn add mnb-exchange-rate
```

## Usage

### Client singleton

```js
import {getClient} from 'mnb-exchange-rate';

const client = await getClient();
```

### Escape hatch to [soap](https://www.npmjs.com/package/soap) library

```js
client.soap.addSoapHeader('X-Foo', 'bar');
```

### General information

```js
const info = await client.GetInfo();
```

```js
{
  FirstDate: "1949-01-03",
  LastDate: "2025-11-21",
  Currencies: [
    "HUF",
    // ....
    "YUD",
  ],
};
```

### Available currencies

```js
const currencies = await client.GetCurrencies();
```

```js
{
  Currencies: [
    "HUF",
    // ....
    "YUD",
  ],
}
```

### Currency units

```js
const units = await client.GetCurrencyUnits({currencies: ['EUR', 'JPY']});
```

```js
{
  EUR: 1,
  JPY: 100,
}
```

### Range of historic data

```js
const interval = await client.GetDateInterval();
```

```js
{
  FirstDate: "1949-01-03",
  LastDate: "2025-11-21",
}
```

### Current exchange rate of all currencies

```js
const rate_current = await client.GetCurrentExchangeRates();
```

```js
{
  AUD: 214.62,
  // ...
  ZAR: 19.22,
}
```

### Get exchange rate by interval and specific currencies

```js
const rates = await client.GetExchangeRates({
  startDate: '2025-02-02',
  endDate: '2025-02-04',
  currencies: ['EUR'],
});
```

```js
{
  "2025-02-04": {
    EUR: 408.06,
  },
  "2025-02-03": {
    EUR: 409.3,
  },
}
```
