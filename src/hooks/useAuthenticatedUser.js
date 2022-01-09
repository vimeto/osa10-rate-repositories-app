import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../components/graphql/queries';

const useRepository = (variables = { includeReviews: true }) => {
  const [user, setUser] = useState();

  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  useEffect(() => {
    if (data && data.authorizedUser) {
      setUser(data.authorizedUser);
    }
  }, [data]);


  return { user, loading, refetch };
};

export default useRepository;