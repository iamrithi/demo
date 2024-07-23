/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import CustomInputField from "../common/customInputField";
import { useForm } from "react-hook-form";
import {
  credentialLoginSchema,
  otpVerificationSchema,
  phoneLoginSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Login, loginWithPhone } from "@/action-data/loginAction";
import { Input } from "../ui/input";
import { Axios } from "@/lib/axios";
import { toast } from "sonner";
import { verifyOtpWithToken } from "@/api-middleware/otpAction";
import { Checkbox } from "../ui/checkbox";
import { PuffLoader } from "react-spinners";

const LoginScreenSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneLogin, setPhoneLogin] = useState<boolean>(true);
  const [otpField, setOtpFiels] = useState<boolean>(false);
  const [otpId, setOtpId] = useState<string | null>(null);
  const loginForm = useForm<z.infer<typeof phoneLoginSchema>>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phone_no: "",
    },
  });
  const credentialForm = useForm<z.infer<typeof credentialLoginSchema>>({
    resolver: zodResolver(credentialLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const otpForm = useForm<z.infer<typeof otpVerificationSchema>>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: "",
      otpId: otpId || "",
    },
  });
  const loginFormSubmit = async (values: z.infer<typeof phoneLoginSchema>) => {
    setIsLoading(!isLoading);
    try {
      loginWithPhone(values).then((data) => {
        if (data.success) {
          setOtpFiels(!otpField);
          setOtpId(data?.data?.id);
          setIsLoading(false);
          toast.success(`${data.message}`, {
            position: "top-right",
            dismissible: true,
          });
        } else {
          setIsLoading(false);
          toast.error(`${data.message}`, {
            position: "top-right",
            dismissible: true,
          });
        }
      });
    } catch (error: any) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        dismissible: true,
      });
      setIsLoading(false);
    }
  };
  const credentialFormSubmit = async (
    values: z.infer<typeof credentialLoginSchema>
  ) => {
    setIsLoading(!isLoading);
    try {
      const user = await Axios.post("/auth/login", values);
      await Login(user.data.data.id).then((callback: any) => {
        if (callback?.error == undefined) {
          setIsLoading(false);

          toast.success(`Login successful`, {
            position: "top-right",
            dismissible: true,
          });
        } else {
          setIsLoading(false);
          toast.error(`${callback?.error}`, {
            description:
              "Oops! It seems like the credentials you entered are incorrect. Please double-check your username and password and try again",
            position: "top-right",
            dismissible: true,
          });
        }
      });
      return;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        dismissible: true,
      });
      return;
    }
  };
  const otpFormSubmit = async (
    values: z.infer<typeof otpVerificationSchema>
  ) => {
    setIsLoading(!isLoading);
    try {
      const user = await Axios.post("/auth/login/otp-verify", values);
      await Login(user.data.data.id).then((callback: any) => {
        if (callback?.error == undefined) {
          setIsLoading(false);
          toast.success(`Login successful`, {
            position: "top-right",
            dismissible: true,
          });
        } else {
          setIsLoading(false);
          toast.error(`${callback?.error}`, {
            description:
              "Oops! It seems like the credentials you entered are incorrect. Please double-check your username and password and try again",
            position: "top-right",
            dismissible: true,
          });
        }
      });
      return;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        dismissible: true,
      });
      return;
    }
  };
  useEffect(() => {
    otpForm.setValue("otpId", otpId!);
  }, [otpId]);
  useEffect(() => {
    setTimeout(() => {
      setOpen(!open);
    }, 300);
  }, []);
  return (
    <Sheet open={open} defaultOpen={false}>
      <SheetContent className="sm:max-w-[525px] backdrop-blur-[100px] bg-white/10 w-[600px] border-none m-0 flex flex-col justify-center items-center ">
        {phoneLogin && !otpField && (
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(loginFormSubmit)}
              className="w-full   flex flex-col justify-center items-start p-4  "
            >
              <h1 className="text-white text-2xl font-bold drop-shadow-sm my-4 ">
                <FaUser /> Welcome back to{" "}
                <span className="text-red-500 ml-1">VOrA</span>
              </h1>
              <FormField
                control={loginForm.control}
                name="phone_no"
                render={({ field }) => (
                  <FormItem className="w-3/4 p-[1px] mr-[1px]">
                    <Label className="text-white font-weight">
                      Phone Number
                    </Label>
                    <FormControl className="w-full">
                      <CustomInputField
                        type="number"
                        placeholder={"93X-XXX-XXXX"}
                        field={field}
                        className="rounded-[2px] w-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant={"secondary"}
                className="my-2 w-3/4 p-0 mx-0 rounded-sm bg-theme text-white shadow-sm shadow-white/30  hover:bg-theme text-md font-bold"
              >
                {!isLoading && "Login"}
                {isLoading && (
                  <PuffLoader
                    color="white"
                    className="text-white text-[4px]"
                    size={20}
                  />
                )}
              </Button>
            </form>
          </Form>
        )}
        {!phoneLogin && !otpField && (
          <Form {...credentialForm}>
            <form
              onSubmit={credentialForm.handleSubmit(credentialFormSubmit)}
              className="w-full   flex flex-col justify-center items-start p-4  "
            >
              <h1 className="text-white text-2xl font-bold drop-shadow-sm my-4 ">
                <FaUser /> Welcome back to{" "}
                <span className="text-red-500 ml-1">VOrA</span>
              </h1>
              <FormField
                control={credentialForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-3/4 p-[1px] mr-[1px]">
                    <Label className="text-white font-weight">Email</Label>
                    <FormControl className="w-full">
                      <CustomInputField
                        type="email"
                        placeholder={"example@gmail.com"}
                        field={field}
                        className="rounded-[2px] w-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={credentialForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-3/4 p-[1px] mr-[1px]">
                    <Label className="text-white font-weight">Password</Label>
                    <FormControl className="w-full">
                      <CustomInputField
                        type="text"
                        placeholder={"********"}
                        field={field}
                        className="rounded-[2px] w-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"secondary"}
                className="my-2 w-3/4 p-0 mx-0 rounded-sm bg-theme text-white shadow-sm shadow-white/30  hover:bg-theme text-md font-bold"
              >
                {!isLoading && "Login"}
                {isLoading && (
                  <PuffLoader
                    color="white"
                    className="text-white text-[4px]"
                    size={20}
                  />
                )}
              </Button>
            </form>
          </Form>
        )}
        {phoneLogin && otpField && (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(otpFormSubmit)} className="">
              <div className="relative">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold text-lg">
                        One-Time Password
                      </FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="text-white/70">
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant={"secondary"}
                className="my-2 w-3/4 p-0 mx-0 rounded-sm bg-theme text-white shadow-sm shadow-white/30  hover:bg-theme text-md font-bold"
              >
                {!isLoading && "Verify OTP"}
                {isLoading && (
                  <PuffLoader
                    color="white"
                    className="text-white text-[4px]"
                    size={20}
                  />
                )}
              </Button>
            </form>
          </Form>
        )}
        {!otpField && (
          <div className="w-full ml-10 flex justify-start items-start">
            <Checkbox
              id="terms"
              checked={!phoneLogin}
              onCheckedChange={(e: boolean) => {
                setPhoneLogin(!e);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm ml-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Login with credentials
            </label>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LoginScreenSheet;
