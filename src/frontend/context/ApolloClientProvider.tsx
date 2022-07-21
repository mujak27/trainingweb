import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

type props = {
  children : React.ReactNode | React.ReactNode[]
}
export const ApolloClientProvider : React.FC<props> = ({children}) => {

  const client = new ApolloClient({
    uri: 'http://localhost:5003/graphql',
    cache: new InMemoryCache(),
  });

  

  return (
    <>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </>
  );
}