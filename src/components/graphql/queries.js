import { gql } from "@apollo/client";

export const GET_REPOSITORIES  = gql`
query getAllWithFilter($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
    edges {
      node {
        id
        ownerAvatarUrl
        name
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

export const GET_SINGLE_REPO_BY_ID = gql`
query singleRepo($id: ID!) {
  repository(id: $id) {
    id
    fullName
    url
    name
    ownerAvatarUrl
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;