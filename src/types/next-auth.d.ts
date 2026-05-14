import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            token?: string; // لتعريف التوكن اللي راجع من API الخارجي
        };
    }

    interface User {
        tokenFromServer?: string; // لتعريف الحقل اللي أنت ضفته في authorize
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        tokenFromServer?: string;
    }
}
