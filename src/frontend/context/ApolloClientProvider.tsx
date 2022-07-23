import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

type props = {
  children : React.ReactNode | React.ReactNode[]
}
export const ApolloClientProvider : React.FC<props> = ({children}) => {
  console.info(process.env.PORT);
  const client = new ApolloClient({
    uri: `http://localhost:${process.env.PORT}/graphql`,
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