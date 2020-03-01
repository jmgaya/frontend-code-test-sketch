import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DocumentContainer from "./components/document-container";
import ArtboardContainer from "./components/artboard-container";
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
        <ArtboardContainer />
      </Route>
      <Route path={`${DOCUMENT_ROUTE}/:documentId`}>
        <DocumentContainer />
      </Route>
      <Route path={ROOT_ROUTE}>
        <Redirect to={DEFAULT_DOCUMENT_ROUTE} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
