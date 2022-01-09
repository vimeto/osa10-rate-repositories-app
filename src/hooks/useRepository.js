import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO_BY_ID } from '../components/graphql/queries';

const useRepository = (variables) => {
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState();

  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(GET_SINGLE_REPO_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  useEffect(() => {
    if (data && data.repository) {
      setRepository(data.repository);
      const r = data.repository.reviews.edges.map(e => e.node);
      setReviews(r);
    }
  }, [data]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };

  return { repository, reviews, error, loading, refetch, fetchMore: handleFetchMore, ...result };
};

export default useRepository;