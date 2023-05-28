import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const LOGIN_URL = `${process.env.BASE_URL}/api/login/user`;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${LOGIN_URL}`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          const { data, success } = await res.json();
          const user = data;
          if (success) {
            return user;
          }
          throw new Error(data);
        } catch (error:any) {
          console.log("Sign In Error---->", `email - ${credentials?.email} - ${error?.message}}`);
          return null;
        }
      }
    })
  ],

  pages: {
    signIn: "/api/auth/signIn"
  },

  secret: process.env.SECRET,

  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      // Add access_token to the token right after signin
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({session, token}) {
      // Add property to session, like an access_token from a provider.
      return {
        ...session,
        // @ts-ignore
        user: token?.data?.user,
        // @ts-ignore
        token: token?.data?.token
      };
    }
  }
};

export default NextAuth(authOptions);
