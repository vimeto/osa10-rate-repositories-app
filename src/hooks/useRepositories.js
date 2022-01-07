import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../components/graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (data && data.repositories) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, error, loading };
};

export default useRepositories;