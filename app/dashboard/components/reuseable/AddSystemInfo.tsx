"use client"

import { Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import CustomModal from "./CustomModal"
import { modalStateType } from "@/types"
import { useState } from "react"

const AddSystemInfo: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [data, setData] = useState({
        phone: "",
        mail: "",
        slogan: ""
    })

    const handleSubmit = () => {
        console.log(data)
    }

    return(
        <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add System Info" width={"small"} loading={false}>
            <Form>
                <Form.Item
                    required
                    label={"Phone"}
                    name={"phone"}
                >
                    <Input
                        placeholder="Enter phone number" 
                        onChange={(e) => {
                            setData((prev) => {
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
                    name={"mail"}
                >
                    <Input 
                        placeholder="Enter school's email" 
                        onChange={(e) => {
                            setData((prev) => {
                                return {
                                    ...prev,
                                    mail: e.target.value                                        
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
                        defaultValue={data?.slogan}
                        onChange={(e) => setData((prev: any) => {
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