## References
* https://docs.arweave.org/developers/server/http-api
* https://github.com/textury/arlocal
* https://github.com/ArweaveTeam/testweave-docker
* https://github.com/ArweaveTeam/testweave-sdk

## Yarn add 
* For test you'll install: `yarn add testweave-sdk`

## Start ArWeave Service.
* npx arlocal

## Start Project.
* yarn install
* yarn start

## Test info.
* Add balance: http://localhost:1984/mint/SHL61GkE1NuDNTbuWPVr5boiBTBkmS-GJtxM3P6XIDg/100000000000000
* Get balance: http://127.0.0.1:1984/wallet/SHL61GkE1NuDNTbuWPVr5boiBTBkmS-GJtxM3P6XIDg/balance

## Check node info:
* http://localhost:1984/info

## On polkadot loading err:
* ref: https://www.valentinog.com/blog/webpack/#how-to-set-up-react-webpack-5-and-babel-from-scratch
* yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react
* configure babel to use the React preset in babel.config.json:
