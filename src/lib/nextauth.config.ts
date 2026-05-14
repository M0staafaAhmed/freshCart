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
                        id: result.user.email,
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
        async jwt({ token, user }) {
            // أول ما المستخدم يسجل دخول، بننقل التوكن من الـ user للـ JWT
            if (user) {
                token.tokenFromServer = user.tokenFromServer;
            }
            return token;
        },
        async session({ session, token }) {
            // بننقل التوكن من الـ JWT للـ Session عشان تقدر تستخدمه في الـ components
            if (token) {
                session.user.token = token.tokenFromServer;
            }
            return session;
        },
    },

    session: {
        maxAge: 60 * 60 * 24 * 7, // 1 hour
    },

    pages: {
        signIn: "/login",
    },
};
