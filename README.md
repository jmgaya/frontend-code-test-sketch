# Frontend Code Test Sketch

## Main goal

You can find the description [here](https://github.com/sketch-hq/frontend-code-test)

## Requirements

- Install [node.js](https://nodejs.org/en/download/) (latest stable version should be Ok)
- Install [yarn](https://yarnpkg.com/docs/install) (latest stable version should be Ok)
- Execute `yarn && yarn start` from the `app` directory

## Decisions

* [CRA](http://create-react-app.dev/) for simplicity purposes when setting up an entire new React project
* Using [styled components](https://styled-components.com/) because Sketch is internally using **styled components**. On my day by day basis I use [JSS](https://cssinjs.org/) with its main advantages (and disavantages) over **styled components**
* Removed all the logic referring [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) because it's not a requirement.
* Removed the [Webapp manifest](https://developers.google.com/web/fundamentals/web-app-manifest) because it's not a requirement.
* Added an **asterisk rule** with several CSS rules. This seeks a more "natural layout model" for padding and margin rules.
* Used same `favicon.ico` present [here](https://sketch.cloud/s/z3p4o)
* Favoured *arrow functions* over explicit *function declarations* mainly because of issues with scopes and simplicity
* Using [yarn](https://yarnpkg.com/) as the package manager because it comes with [CRA](http://create-react-app.dev/) and I'm using it on my day by day basis.
* Using **fetch** for querying the API for simplicity.
* Extracted **constants** like *colors* and *routes* for "changing once, working everywhere"
* Extracted **common** components as `Header`, `Spinner` and `Logo` for future usages.
* Using **Roboto** as main font, but with **swap**, so the browser will initially show a fallback font, then once the Google Font has downloaded it will swap the fonts.