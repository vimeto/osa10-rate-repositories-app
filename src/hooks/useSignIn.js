import { useMutation } from "@apollo/client";
import { AUTHORIZE_USER } from '../components/graphql/mutations';
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";


const useSignIn = () => {
  const [ mutate, result ] = useMutation(AUTHORIZE_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    try {
      const accessToken = data.authorize.accessToken;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } 
  };

  return [signIn, result];

};

export default useSignIn;