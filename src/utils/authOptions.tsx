import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { UserPool } from "@/utils/userPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

type loginType = {
  email: string;
  password: string;
};

function asyncAuthenticateUser(
  cognitoUser: any,
  cognitoAuthenticationDetails: any
) {
  return new Promise(function (resolve, reject) {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: resolve,
    });
  });
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as loginType;

        const authenticationData = {
          Username: email,
          Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
          authenticationData
        );
        const userData = {
          Username: email,
          Pool: UserPool,
        };
        const cognitoUser = new CognitoUser(userData);

        try {
          const result = await asyncAuthenticateUser(
            cognitoUser,
            authenticationDetails
          );
          //@ts-ignore
          let res = {
            //@ts-ignore
            user: result.getIdToken().decodePayload(),
            //@ts-ignore
            accessToken: result.getAccessToken().getJwtToken(),
            //@ts-ignore
            refreshToken: result.getRefreshToken().token,
          };

          return res;
        } catch (error) {
          //@ts-ignore
          throw new Error(error.code);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as any;
      //@ts-ignore
      session.token = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },
};
