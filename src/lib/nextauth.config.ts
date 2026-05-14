import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "freshCart",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const res = await fetch(
                    "https://ecommerce.routemisr.com/api/v1/auth/signin",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    },
                );
                const result = await res.json();

                if (result.user) {
                    return {
                        name: result.user.name,
                        email: result.user.email,
                        tokenFromServer: result.token,
                    };
                }

                return null;
            },
        }),
    ],

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.tokenFromServer;
            }
            return token;
        }
    },

    session: {
        maxAge: 60 * 60 * 24 * 7, // 1 hour
    },

    pages: {
        signIn: "/login",
    },
};
