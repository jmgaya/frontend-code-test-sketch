import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Document from "./components/document";
import { ARTBOARD_ROUTE, DOCUMENT_ROUTE, ROOT_ROUTE } from "./constants/routes";

const App = () => (
  <Router>
    <Switch>
      <Route path={ARTBOARD_ROUTE}>
        <p> Artboard </p>
      </Route>
      <Route path={`${DOCUMENT_ROUTE}/:documentId`}>
        <Document />
      </Route>
      <Route path={ROOT_ROUTE}>
        <Document id="Y8wDM" />
      </Route>
    </Switch>
  </Router>
);

export default App;
