import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../components/graphql/queries';

const useRepositories = (variables) => {
  /* const value = searchKeyword;
  const [orderBy, orderDirection] = sort_values ? sort_values.split(" ") : [undefined, undefined];
  const variables = { orderBy, orderDirection, searchKeyword: value }; */

  const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  useEffect(() => {
    if (data && data.repositories) {
      setRepositories(data.repositories);
    }
  }, [data]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories, error, loading, refetch, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;