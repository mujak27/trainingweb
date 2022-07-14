import { useQuery, ApolloError } from "@apollo/client";
import React from "react";
import { queryAll } from "./lib/graphql/query";

type props={

};

export const Home:React.FC<props> = () => {
  const {loading, data : resData, error} = useQuery(queryAll);

  if(loading){
    return <>loading data...</>
  }
  console.info(error as ApolloError);

  console.info(resData);

  return (
    <>
      this is from db
      {
        
      }
    </>
  )
}

