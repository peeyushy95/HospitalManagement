import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql', // Replace with your Hasura instance URL
  headers: {
    'x-hasura-admin-secret': 'secret', // Replace with your actual admin secret
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap App with ApolloProvider to provide the client context
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);