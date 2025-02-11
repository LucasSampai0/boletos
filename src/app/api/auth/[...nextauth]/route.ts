import prisma from "@/lib/prisma";
import NextAuth, { DefaultSession, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@email.com" },
        cpf: { label: "CPF", type: "text", placeholder: "000.000.000-00" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const inquilino = await prisma.inquilinos.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { cpf: credentials.cpf },
            ]
          }
        });

        if (!inquilino) {
          return null;
        }

        const compatibleHash = credentials.password.replace("$2y$", "$2a$");

        const isPasswordValid = await bcrypt.compare(compatibleHash, inquilino.senha?.toString() || "");

        if (!isPasswordValid) {
          return null;
        }

        const userData = {
          id: inquilino.id.toString(),
          name: inquilino.nome,
          cpf: inquilino.cpf,
          email: inquilino.email,
          idInquilino: inquilino.id,
        }

        return userData;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user: inquilino }) {
      if (inquilino) {
        token.id = inquilino.id;
        token.name = inquilino.name;
        token.cpf = inquilino.cpf;
        token.email = inquilino.email;
      }
      return token;
    },
    async session({session, token, user}){
      session.user = token as any;
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };