"use server";

import { getMyToken } from "@/utils/getMyToken";
import { revalidatePath } from "next/cache";

export async function addAddress(data: any) {
  const token = (await getMyToken()) as string; // 👈 التعديل هنا

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    headers: {
      token: token,
    },
    body: JSON.stringify(data),
  });

  revalidatePath("/profile/addresses"); // 👈 إعادة جلب بيانات العناوين بعد الإضافة
  return res.json();
}

export async function updateProfile(data: any) {
  const token = (await getMyToken()) as string; // 👈 التعديل هنا

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "token": token,
          "Content-Type": "application/json", // تأكد من إرسال الهيدر ده عشان السيرفر يعرف نوع البيانات المرسلة
        },
        body: JSON.stringify(data),
      },
    );

    revalidatePath("/profile"); // 👈 إعادة جلب بيانات الملف الشخصي بعد التحديث
    const finalResult = await res.json();
    console.log("API response from updateProfile:", finalResult); // 👈 لوج للتأكد من استجابة السيرفر
    return finalResult;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
    throw error; // إعادة رمي الخطأ عشان يتعامل معاه في الكومبوننت
  }
}


export async function changePassword(data: any) {
  const token = (await getMyToken()) as string; // 👈 التعديل هنا

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        "token": token,
        "Content-Type": "application/json", // تأكد من إرسال الهيدر ده عشان السيرفر يعرف نوع البيانات المرسلة
      },
      body: JSON.stringify(data),
    },
  );
  return res.json();
}