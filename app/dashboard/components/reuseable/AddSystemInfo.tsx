"use client"

import { Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import CustomModal from "./CustomModal"
import { modalStateType } from "@/types"
import { useEffect, useState } from "react"
import { systemInfoType, useSetSystemInfoMutation } from "@/lib/api/systemApiSlice"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "@/lib/store"
import { setAuthorizationToken } from "@/lib/slices/authSlice"
import { useForm } from "antd/es/form/Form"

interface addSystemInfoType extends modalStateType {
    data?: systemInfoType    
}

const AddSystemInfo: React.FC<addSystemInfoType> = ({isModalVisible, setisModalVisible, data}) => {
    const [form] = useForm();
    const [systemInfo, {isLoading, isSuccess}] = useSetSystemInfoMutation()
    const dispatch = useAppDispatch()
    // const { token } = useSelector((state : RootState) => state.auth)
    const [systemInfoData, setSystemInfoData] = useState<systemInfoType>({
        id: null,
        image: "",
        phone: null,
        email: "",
        slogan: ""
    })

    useEffect(() => {
        if (data){
            setSystemInfoData({
                id: data?.id,
                email: data?.email,
                slogan: data?.slogan,
                phone: data?.phone,
                image: data?.image
            })
        }
        form.setFieldsValue({
            phone: data?.phone,
            email: data?.email,
            slogan: data?.slogan
        })
    }, )

    // console.log(token)

    const handleSubmit = () => {
        systemInfo(systemInfoData)
        console.log(systemInfoData)
    }

    return(
        <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add System Info" width={"small"} loading={false}>
            <Form
                form={form}
            >
                <Form.Item
                    required
                    label={"Phone"}
                    name={"phone"}
                >
                    <Input
                        placeholder="Enter phone number" 
                        onChange={(e) => {
                            setSystemInfoData((prev: any) => {
                                return {
                                    ...prev,
                                    phone: e.target.value
                                }
                            })
                        }} 
                    />
                </Form.Item>
                <Form.Item
                    required
                    label={"Email"}
                    name={"email"}
                >
                    <Input 
                        placeholder="Enter school's email" 
                        onChange={(e) => {
                            setSystemInfoData((prev) => {
                                return {
                                    ...prev,
                                    email: e.target.value                                        
                                }
                            })
                        }} 
                    />
                </Form.Item>
                <Form.Item
                    required
                    label={"School Slogan"}
                    name={"slogan"}
                >
                    <TextArea
                        className=" !h-[100px] "
                        placeholder="Enter school slogan..."
                        defaultValue={systemInfoData?.slogan}
                        onChange={(e) => setSystemInfoData((prev: any) => {
                            return {
                                ...prev,
                                slogan: e.target.value
                            }
                        })}
                    />
                </Form.Item>
            </Form>
        </CustomModal>
    )
}
export default AddSystemInfo