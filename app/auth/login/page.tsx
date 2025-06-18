"use client"

import { faLock, faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LoadingOutlined } from "@ant-design/icons";

import { Button, Form, Input } from "antd"
import toast from "react-hot-toast"
import { motion } from "framer-motion";
import { useLoginMutation } from "@/lib/api/authApiSlice"
import { RootState, useAppSelector } from "@/lib/store"
import { useEffect } from "react"
import Link from "next/link";


interface loginForm {
    email: string,
    password: string
}

const Login = () => {
    const token = useAppSelector((state: RootState) => state.auth)
    console.log(token);
    console.log(typeof token.token);
    
    const [login, {isLoading, isError, isSuccess, data, error}] = useLoginMutation()
    const handlSubmit = (value : loginForm) => {
        login({ email: value.email, password: value.password});
    }

    useEffect(() => {
        if(isSuccess){
            toast.success("Login Successful");
        }
        if(isError){
            toast.error("Something went wrong")
        }
    }, [isSuccess, isError])
 

    return(
        <motion.section animate={{scale:1}} initial={{scale:0.3}} transition={{duration:0.5}}  className=" flex justify-center items-center h-full bg-white shadow-custom_shad1 p-4 rounded-sm " >
            <Form 
                className=" w-[550px] h-fit " 
                onFinish={handlSubmit}
                name="login"
                layout="vertical" 
            >
                <Form.Item 
                    required 
                    name={"email"}
                    label={"Email"}
                    rules={
                        [{
                            required: true,
                            message: "Email is required"
                        }]
                } >
                    <Input 
                        className="authInputStyle "
                        prefix={<FontAwesomeIcon icon={faPaperPlane} className=" text-black mr-2" />}
                        placeholder="Input email here" 
                    />
                </Form.Item>
                <Form.Item
                    required
                    label={"Password"}
                    name={"password"}
                    rules={[
                        {
                            required: true,
                            message: "Password is required"
                        }
                    ]}  
                >
                    <Input.Password 
                        className="authInputStyle "
                        prefix={<FontAwesomeIcon icon={faLock} className=" text-black mr-2" />}
                        placeholder="Input password here"  
                    />
                </Form.Item>
                <Form.Item className=" text-end" >
                    <Link className=" text-blue-500" href={"/auth/resetpassword"} >
                        Forgot Password?
                    </Link>
                    <Button className=" hover:border-none hover:!bg-black hover:!text-white !w-full bg-black text-white rounded-none " htmlType="submit" >
                        {isLoading ? (
                            <LoadingOutlined className="animate-spin" />
                        ) : (
                            "Login"
                        )}  
                    </Button>
                </Form.Item>
            </Form>
            
        </motion.section>
    )

}

export default Login