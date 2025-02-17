import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            email: string | null;
            name: string | null;
            image: string | null;
        }
    }
}