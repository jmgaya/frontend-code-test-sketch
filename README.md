# Frontend Code Test Sketch

## Main goal

You can find the description [here](https://github.com/sketch-hq/frontend-code-test)

## Requirements

- Install [node.js](https://nodejs.org/en/download/) (latest stable version should be Ok)
- Install [yarn](https://yarnpkg.com/docs/install) (latest stable version should be Ok)
- Execute `yarn` from the `app` directory

## How to run?

- Execute `yarn && yarn start` from the `app` directory

## Decisions

* [CRA](http://create-react-app.dev/) for simplicity purposes when setting up an entire new React project
* Using [React Router](https://reacttraining.com/react-router/web/) for routing simplicity.
* **Document routes** have `/document/document-id` shape
* **Artboard routes** have `/document/document-id/artboard/artboard-idx` shape
* Using **UPPERCASE** for constants.
* Implemented **Load different documents depending on the URL** bonus point through `/document/document-id` routes, defaulting to `document/Y8wDM` when accessing `/` route
* Using [styled components](https://styled-components.com/) because Sketch is internally using **styled components**. On my day by day basis I use [JSS](https://cssinjs.org/) with its main advantages (and disavantages) over **styled components**
* Removed all the logic referring [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) because it's not a requirement.
* Removed the [Webapp manifest](https://developers.google.com/web/fundamentals/web-app-manifest) because it's not a requirement.
* Added an **asterisk rule** with several CSS rules. This seeks a more "natural layout model" for padding and margin rules.
* Used same `favicon.ico` present [here](https://sketch.cloud/s/z3p4o)
* Favoured *arrow functions* over explicit *function declarations* mainly because of issues with scopes and simplicity
* Using [yarn](https://yarnpkg.com/) as the package manager because it comes with [CRA](http://create-react-app.dev/) and I'm using it on my day by day basis.
* Using **fetch** for querying the API for simplicity.
* Extracted **constants** like *colors*,  *routes* or *fonts* for "changing once, working everywhere" pattern.
* Extracted **common** components as `Header`, `Spinner`, `Button` or `Logo` given its multiple usages.
* Using **Roboto** as main font, but with **swap**, so the browser will initially show a fallback font, then once the Google Font has downloaded it will swap the fonts.
* Delaying **loading spinner** 1s manually trying to mimic React.lazy loading when fetching data (in this case, the required document). This practice intends to avoid a "spinner party" when our UI requires several parts to be fetched/rendered independently one from another.
* Display error case when the document could not be fetched.
* Indexes in artboard routes start at 0 (e.g. `http://localhost:3000/document/Y8wDM/artboard/0`), but the `Paginator` displays a "less nerd" index, starting at 1.
* Using directly some **assets** provided in the `.svg` format through `ReactComponent` (provided in [CRA](http://create-react-app.dev/)).
* Artboard image URL is calculated by sorting all available URLs in descendant order. Afterward we'll take the first URL which fits into the image container. In case there's no image which fits properly into the container space, we take the smallest image. This only happens when the component mounts in `artboard.js`
* Tested [routes](./app/src/utils/__tests__/routes-test.js) and [query](./app/src/utils/__tests__/query-test.js) utils.
* Tested [Button](./app/src/components/common/__tests__/button-test.js) React component.

## Improvements

* [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing#snapshot-testing-with-jest).
* Testing React complex components like `artboard.js` or `document.js`. In those scenarios we'll should make use of [act](https://testing-library.com/docs/preact-testing-library/api#act) because of the usage of hooks and API requests.
* A more restrictive **eslint configuration** (e.g. `debugger` is allowed).
* Pre-commit hook which runs [eslint](https://eslint.org/) and [prettier](https://prettier.io/). This pretends to avoid commiting code that doesn't met our code standards (e.g. [husky](https://github.com/typicode/husky))
* Bind **Left** and **Right** keyboard keys for a simple Artboard navigation.
* Error scenario when artboard index is out of bounds for given document (e.g. `/document/Y8wDM/artboard/25`)
* Error scenario in artboard route with invalid document (e.g. `/document/1/artboard/0`)
* Avoid using texts without a **translation tool** for language localization.
* Create a `constants/spacings` file, holding a well defined set of spacings our design follows (e.g. SPACING_S(12), SPACING_M(14), ...)
* Improve `constants/styles` animations, because it only allows a single animation to be used, for example, by creating HoC whose main proposal is animating inner children.
* Avoid duplicated GraphQL queries with some caching strategy. This could be solved with several strategies:
    * Using some kind of [context](https://reactjs.org/docs/context.html) which holds all the information about the **application state** combined with **useReducer** as shown [here](https://github.com/jmgaya/frontend-shopping-cart-challenge/blob/master/app/src/store/index.js)
    * Caching each successfull **query** internally when requesting the [API](https://graphql.sketch.cloud/api) and returning this value if cached. This strategy requires another mechanism,  because subsequent calls could hit the server if our product demands. In this case, we can use a **TTL** mechanism, meaning we'll query the API if the cached data has been stored for a long.