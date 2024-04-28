import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        try {
          const userFound = await db.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
  
          if (!userFound) throw new Error("No user found");
  
          const matchPassword = await bcrypt.compare(
            credentials?.password ?? "",
            userFound.password
          );
  
          if (!matchPassword) throw new Error("Wrong password");
  
          return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
        
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
