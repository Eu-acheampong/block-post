import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/user.model";
import dbConnect from "../../../libs/dbConnect";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login Here",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const { email, password } = credentials;

        // checking if user is on the database
        let user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        // checking if pasword match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        // returning the user
        return user;
      },
    }),
  ],
  callback: {
    jwt: ({ token, user }) => {
      if (token) {
        token.id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session.id = token.id;
        session.firstName = token.firstName;
        session.lastName = token.lastName;
      }
    },
  },
  secret: "secret",
  jwt: {
    secret: "ThisIsMySecret",
    encrypt: true,
  },
});
