# MNB Exchange Rate API

[Docs - mnb.hu](https://www.mnb.hu/sajtoszoba/sajtokozlemenyek/2015-evi-sajtokozlemenyek/tajekoztatas-az-arfolyam-webservice-mukodeserol)

## Install

```bash
yarn add mnb-exchange-rate
```

## Usage

```js
import {getClient} from 'mnb-exchange-rate'

const client = await getClient()

const info = await client.GetInfo()
const currencies = await client.GetCurrencies()
const units = await client.GetCurrencyUnits({currencies: ['EUR', 'JPY']})
const interval = await client.GetDateInterval()
const rate_current = await client.GetCurrentExchangeRates()
const rates = await client.GetExchangeRates({startDate: '2000-01-01', endDate: '2000-01-02', currencies: ['EUR']})
```
