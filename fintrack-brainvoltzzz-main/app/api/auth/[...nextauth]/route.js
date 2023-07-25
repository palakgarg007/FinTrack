import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/utils/database";
import User from "@/Models/User";
import { TiersList } from "@/utils/Utils";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      session.user.currentTokens = sessionUser.currentTokens;
      session.user.dreamProductType = sessionUser.dreamProductType;
      session.user.dreamProduct = sessionUser.dreamProduct;
      session.user.lastTransactionRefresh = sessionUser.lastTransactionRefresh;
      session.user.transactions = sessionUser.transactions;
      session.user.referKey = sessionUser.referKey;

      {
        TiersList.map((tier) => {
          if (
            tier.tokenStart <= sessionUser.currentTokens &&
            tier.tokenEnd >= sessionUser.currentTokens
          ) {
            session.user.currentTier = tier.key;
            session.user.tierProgress =
              ((sessionUser.currentTokens - tier.tokenStart + 1) /
                (tier.tokenEnd - tier.tokenStart)) *
              100;
          }
        });
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const user = await User.findOne({ email: profile.email });

        if (!user) {
          await User.create({
            email: profile.email,
            name: profile.name,
            username: profile.name.split(" ").join("").toLowerCase(),
            image: profile.picture,
            referKey: profile.name.split(" ").join("").toLowerCase(),
          });
        }

        return true;
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  },
});

export { handler as GET, handler as POST };
