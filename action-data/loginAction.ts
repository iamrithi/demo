import { DEFAULT_LOGIN_REDIRECT } from "@/config/const";
import { Axios } from "@/lib/axios";
import { credentialLoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import * as z from "zod";
export const loginWithPhone = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/auth/login/phone", data);
    const phone = axiosResponse.data;
    return phone;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const Login = async (user_id: any) => {
  try {
    await signIn("credentials", {
      user_id: user_id,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      //   switch (error.type) {
      //     case "CredentialsSignin":
      //       return { error: "Invalid credentials!" };
      //     default:
      //       return { error: "Something went wrong!", data: error.message };
      //   }
    }

    throw error;
  }
};
