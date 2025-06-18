"use client";
// import I18N from "@/i18n";
import { EyeOutlined, EyeInvisibleOutlined, UnlockOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import OTP from "antd/es/input/OTP";
// import axios from "@/axios";
import React, { useEffect, useState } from "react";
// import { useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
// import {Link} from "@/i18n/routing";
// import I18N from "@/i18n";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMailBulk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useChangePasswordMutation, useSendOtpMutation } from "@/lib/api/authApiSlice";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
type Props = {};

const customizeRequiredMark = (
    label: React.ReactNode,
    { required }: { required: boolean }
) => (
    <>
        {label}
        {required && <span className="text-red-500 ml-[2px]">*</span>}
    </>
);

const page = (props: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [sendOTP,  {isLoading: isSendOTPLoading, isError: isOTPError, isSuccess: isOTPSuccess}] = useSendOtpMutation()
    const [changePassword,  {isLoading: isResetLoading, isError: isResetError, isSuccess: isResetSuccessful}] = useChangePasswordMutation()

    useEffect(() => {
        if(isResetSuccessful){
            toast.success("Password changed successfully");
            router.push("/auth/login")
        }
        if(isResetError){
            toast.error("Something went wrong");
        }
        if(isOTPSuccess){
            toast.success("OTP Sent");
        }
        if(isOTPError){
            toast.error("Something went wrong");
        }
    }, [isResetSuccessful, isResetError, isOTPError])


    const handleSubmit = (values: any) => {
        changePassword({
            token: form.getFieldValue("otp"),
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password"),
            password_confirmation: form.getFieldValue("password_confirmation"),
        } )
    };

    const handleSendOTP = () => {
        sendOTP({email: form.getFieldValue("email")})
    };

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(
        <span>
            Password must be:
            <br /> . At least 2 lowercase letters
            <br /> . At least 2 uppercase letters
            <br /> . At least 2 special characters
            <br /> . At least 2 numbers
            <br /> . Minimum length of 8 characters!
        </span>
      );
    }

    // Check minimum length of 8 characters
    if (value.length < 8) {
        return Promise.reject("Password must be at least 8 characters long!");
    }

    // Check for at least 2 lowercase letters
    if (!/(.*[a-z]){2}/.test(value)) {
        return Promise.reject("Password must have at least 2 lowercase letters!");
    }

    // Check for at least 2 uppercase letters
    if (!/(.*[A-Z]){2}/.test(value)) {
        return Promise.reject("Password must have at least 2 uppercase letters!");
    }

    // Check for at least 2 special characters (!@#$%^&*()_+ etc.)
    if (!/(.*[\W_]){2}/.test(value)) {
        return Promise.reject("Password must have at least 2 special characters!");
    }

    // Check for at least 2 numbers
    if (!/(.*\d){2}/.test(value)) {
        return Promise.reject("Password must have at least 2 numbers!");
    }

    return Promise.resolve();
  };

    return (
        <>
        <motion.section animate={{scale:1}} initial={{scale:0.3}} transition={{duration:0.5}}  className={`bg-white ${isResetError ? "pulse_once" : ""} relative max-w-[500px] w-[90%] flex flex-col rounded-lg shadow-custom_shad1 p-4`}>
            <div className="p-3 rounded-lg grid place-items-center bg-white shadow-shadow-1 w-fit mx-auto mb-4">
                <UnlockOutlined className="text-2xl text-black" />
            </div>

            <p className="text-xl font-semibold text-center text-black">
                Request Password Change
            </p>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-4 flex flex-col"
                requiredMark={customizeRequiredMark}
            >
                <FormItem
                    label={"Email"}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email",
                        },
                        {
                            type: "email",
                            message: "The input is not a valid email",
                        },
                    ]}
                >
                    <Input
                        className="inputStyle"
                        size="large"
                        prefix={<FontAwesomeIcon icon={faPaperPlane} className=" text-black mr-2" />}
                        suffix={
                            isSendOTPLoading ? (
                                <LoadingOutlined className="animate-spin" />
                            ) : (
                                <div className="cursor-pointer" onClick={handleSendOTP}>
                                Send OTP
                                </div>
                            )
                        }
                    />
                </FormItem>

                <FormItem
                    label={"OTP"}
                    name="otp"
                    rules={[
                        {
                        required: true,
                        message: "Please input your otp",
                        },
                    ]}
                >
                    <OTP
                        className="!ring-2"
                        length={6}
                        size="large"
                        onChange={(value) => {
                            console.log("onChange", value);
                        }}
                        type="text"
                    />
                </FormItem>

                <FormItem
                    label={"Password"}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                        },
                        {
                            validator: validatePassword
                        }
                    ]}
                >
                    <Input.Password
                        className="inputStyle"
                        size="large"
                        prefix={<FontAwesomeIcon icon={faLock} className=" text-black mr-2" />}
                    />
                </FormItem>

                <FormItem
                    label={"Confirm Password"}
                    name="password_confirmation"
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password",
                        },
                        {
                            validator: validatePassword
                        }
                    ]}
                >
                    <Input.Password
                        className="inputStyle"
                        size="large"
                        prefix={<FontAwesomeIcon icon={faLock} className=" text-black mr-2" />}
                    />
                </FormItem>
                
                <Link
                    href="/auth/login"
                    className=" text-blue-500 self-end "
                >
                    LOGIN ?
                </Link>
                <button type="submit" className="font-medium bg-black h-[39.6px] text-white py-[7px] px-[11px] rounded-sm flex justify-center items-center gap-2">
                    {
                        isResetLoading ? (
                            <LoadingOutlined className="animate-spin" />
                        ) : (
                            "Change Password"
                        )
                    }
                </button>
            </Form>
        </motion.section>
        </>
    );
};

export default page;
