import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

type props = {
  children : React.ReactNode | React.ReactNode[]
}
export const ApolloClientProvider : React.FC<props> = ({children}) => {
  const graphqlServerUri = `${window.location.href}graphql`;
  console.info(graphqlServerUri);
  const client = new ApolloClient({
    uri: graphqlServerUri,
    // uri: `http://localhost:${process.env.PORT}/graphql`,
    // uri: `http://localhost:5003/graphql`,
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