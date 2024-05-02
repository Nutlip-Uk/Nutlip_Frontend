import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDB from "../../../libs/dbconnect";
import clientPromise from "../../../libs/mongodb";

await connectDB();
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider(),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const session = await getSession();
      if (!session) return unauthorized();

      try {
        // Validate profile data
        const { error } = validateProfile(profile);
        if (error) return error;

        // Find or create user
        let user = await User(profile);

        // Update user with latest profile
        user = await User(user, account, profile);

        return true;
      } catch (error) {
        return error;
      }
    },
  },
};

export default NextAuth(authOptions);
