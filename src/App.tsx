import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client';
import React from 'react';
import { Home } from './Home';

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:5001',
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div>
          <Home/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
