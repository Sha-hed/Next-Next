const { default: NextAuth } = require("next-auth/next");
import { ConnectDB } from "@/lib/ConnetDB";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
export const authOptions = {
  secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await ConnectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }

        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        const db = await ConnectDB();
        const userCollection = await db.collection("users");
        const findUser = await userCollection.findOne({ email });
        try {
          if (!findUser) {
            const us = { name, email, image };
            const res = await userCollection.insertOne(us);
            console.log(res);
          } else {
            console.log("user Already Exists");
            return user;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
