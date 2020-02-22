import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Document from "./components/document";
import Artboard from "./components/artboard";
import {
  ARTBOARD_ROUTE,
  DOCUMENT_ROUTE,
  DEFAULT_DOCUMENT_ROUTE,
  ROOT_ROUTE
} from "./constants/routes";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path={`${DOCUMENT_ROUTE}/:documentId${ARTBOARD_ROUTE}/:artboardIdx`}
      >
        <Artboard />
      </Route>
      <Route path={`${DOCUMENT_ROUTE}/:documentId`}>
        <Document />
      </Route>
      <Route path={ROOT_ROUTE}>
        <Redirect to={DEFAULT_DOCUMENT_ROUTE} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
