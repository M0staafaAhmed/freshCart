import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(){

    const myCookies = await cookies()

    const tokenFromCookies = myCookies.get("next-auth.session-token")?.value

    const decodeToken = await decode({
        token:tokenFromCookies,
        secret: process.env.NEXTAUTH_SECRET!
    })

    const accessToken = decodeToken?.accessToken


    return accessToken;
}