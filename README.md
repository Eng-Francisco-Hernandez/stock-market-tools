## Stock Market Tools

An application build to show hot to use common features in a trading application. Built with TypeScript, React, CSS/SASS and Material UI among others.

The third parties used to implement the trading related features in the project were:

- [Alpaca](https://alpaca.markets/data)
- [Tiingo](https://www.tiingo.com/)

## Project Demo

To see the project go to the next [DEMO LINK](https://eng-francisco-hernandez.github.io/stock-market-tools/)

## Installation and Setup Instructions

#### Example:

Clone down this repository. You will need `node`, `npm` and `yarn` installed globally on your machine.

Installation:

`yarn install`

To Start The App:

`yarn start`

To Visit The App:

[http://localhost:3000/stock-market-tools](http://localhost:3000/stock-market-tools)

To Build The App:

`yarn build`

To Apply ESLint fixes:

`yarn lint:fix`

To Deploy The App Using GH Pages: (requires GH pages configuration)

`yarn deploy`

## Reflection

This was a personal project to use third parties that offer services for trading related features such as get historical stock prices data, validate stock symbols, get the latest news of stock market, among others.

The main programming language being used is TypeScript, and the technologies used to build the project are React, React-Router, CSS/SASS and Material UI. Besides those, to support the development process, reliable packages were used, for example, Recharts to handle graphs, SASS to be able to use SASS in the project and axios to make requests to the third parties APIs.

The project counts with ESLint configuration to validate import sorting and general code formatting for .ts and .tsx files.

The project also counts with a GitHub workflow that automatically deploys the built application using Github Pages whenever a new pull-request is opened to a release branch.
