import { RequestInternal } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvaiders from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'

const authOptions = {
  providers: [
    CredentialsProvaiders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFound) throw new Error("User not found");

        const passwordMatch = await bcrypt.compare(credentials?.password ?? '', userFound.password);

        if(!passwordMatch) throw new Error("Password does not match");

        return {
            id: userFound.id,
            email: userFound.email,
            name: userFound.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
