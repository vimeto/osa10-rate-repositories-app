import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from '../components/graphql/mutations';


const useCreateReview = () => {
  const [ mutate, result ] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({ variables: { repoName: repositoryName, ownerName, rating, text } });
    return data;
  };

  return [createReview, result];

};

export default useCreateReview;