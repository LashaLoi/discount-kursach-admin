import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import dotenv from "dotenv";

dotenv.config();

const {REACT_APP_BACKEND_URL, REACT_APP_BACKEND_URL_WS } = process.env;

const httpLink = createUploadLink({
  uri: REACT_APP_BACKEND_URL
});

const wsLink = new WebSocketLink({
  uri: REACT_APP_BACKEND_URL_WS,
  options: {
    reconnect: true
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => ({
  ...headers,
  headers: {
    "x-token": localStorage.getItem("token") || "",
    "x-refresh-token": localStorage.getItem("refreshToken") || ""
  }
}));

export const client = new ApolloClient({
  link: authLink.concat(terminatingLink),
  cache: new InMemoryCache()
});
