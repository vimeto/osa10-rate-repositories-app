import { gql } from "@apollo/client";

export const GET_REPOSITORIES  = gql`
query getAllWithFilter(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection, 
    $searchKeyword: String
    $first: Int,
    $after: String
    ) {
  repositories(
    orderBy: $orderBy,
    orderDirection: $orderDirection, 
    searchKeyword: $searchKeyword
    first: $first,
    after: $after
    ) {
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
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            fullName
            url
          }
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

export const GET_SINGLE_REPO_BY_ID = gql`
query singleRepo($id: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
      totalCount
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`;