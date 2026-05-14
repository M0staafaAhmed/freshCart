import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getMyToken() {
    // getToken محتاجة الـ request عشان تطلع منه الكوكيز
    const token = await getToken({
        req: {
            cookies: await cookies(),
            headers: await headers(),
        } as any,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // لو كنت مسمي الحقل في الـ callback 'tokenFromServer' زي ما عملنا قبل كدة
    return token?.tokenFromServer || token?.accessToken;
}