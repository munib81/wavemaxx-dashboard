import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/user";
// import bcrypt from "bcryptjs";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/libs/mongoDBAdapter";
// import ConnectDB from "@/libs/ConnectDB";
import { users } from "@/constants/users";

// import { ObjectId } from "mongodb";

const handler = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      async authorize(credentials, req) {
        // ConnectDB();
        const { email, password } = credentials;

        // Check if the user exists in the users array
        const user = users.find((u) => u.email === email);

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // Here, you should implement password checking logic
        // For simplicity, I am directly comparing the plain text passwords
        if (password !== user.password) {
          throw new Error("Invalid Email or Password");
        }

        return Promise.resolve(user);
      },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        // Assuming token includes the user's email
        const userEmail = token.email;

        // Find the user in your users array
        const user = users.find((u) => u.email === userEmail);

        if (user) {
          // Add the user's role to the session object
          session.user.role = user.role;
        }
      }

      return session;
    },

    // async signIn({ user: User }) {
    //   const client = await clientPromise;
    //   const db = client.db("windcraft-db");

    //   try {
    //     const insertDocument = { ...User };
    //     delete insertDocument.id; // Remove the id property

    //     const dataUsers = await db
    //       .collection("users")
    //       .updateMany({ _id: User.id }, { $set: insertDocument }, { upsert: true });

    //     if (dataUsers) {
    //       return this.session;
    //     }

    //     return this.session;
    //   } catch (error) {
    //     console.error("Error updating user in MongoDB:", error);
    //     return this.session;
    //   }
    // },
  },

  pages: {
    signIn: "/",
    signOut: "/login",
    newUser: "/",
  },
  // database: process.env.MONGODB_URL,
  secret: process.env.JWT_SECRET, // Add this line with your JWT secret
  session: {
    strategy: "jwt",
  },
  user: {
    secret: process.env.JWT_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
