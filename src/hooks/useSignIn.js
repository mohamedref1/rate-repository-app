const { useMutation, useApolloClient } = require("@apollo/client");
import useAuthStorage from "../hooks/useAuthStorage";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();
    return data.authenticate.accessToken;
  };

  return [signIn, result];
};

export default useSignIn;
