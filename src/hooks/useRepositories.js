import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../components/graphql/queries';

const useRepositories = (sort_values, searchKeyword) => {
  const value = searchKeyword;
  const [orderBy, orderDirection] = sort_values ? sort_values.split(" ") : [undefined, undefined];
  const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword: value }
  });

  useEffect(() => {
    if (data && data.repositories) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, error, loading, refetch };
};

export default useRepositories;