import { gql } from "@apollo/client";

export const queryAll = gql`
query{
  books{
    name
    id
  }
}
`
