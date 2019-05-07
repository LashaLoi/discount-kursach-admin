import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import App from "./components/App/App.jsx";
import * as serviceWorker from "./serviceWorker";
import { client } from "./apollo";
import "./styles/common.css";

const root = (
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <Router basename="/admin">
        <App />
      </Router>
    </ApolloProviderHooks>
  </ApolloProvider>
);

render(root, document.getElementById("root"));

serviceWorker.unregister();
