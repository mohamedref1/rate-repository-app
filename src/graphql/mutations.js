import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SIGN_In($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
