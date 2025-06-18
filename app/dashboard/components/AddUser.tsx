import { Form, Input } from "antd"
import CustomModal from "./reuseable/CustomModal"
import { useState } from "react"
import { modalStateType } from "@/types"

const AddUser: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [userData, setUserData] = useState([])
    const handleSubmit = () => {
        console.log(userData)
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add Team Member" width={"small"} loading={false}>
                <Form
                    layout="vertical"
                    className=" w-full h-full "
                >
                    <Form.Item
                        className=""
                        required
                        label={"Name"}
                        name={"name"}
                    >
                        <Input
                            onChange={(e) => {
                                setUserData((prev: any) => {
                                    return {
                                        ...prev,
                                        name: e.target.value
                                    }
                                })
                            } } 
                            placeholder="Enter name" 
                        />
                    </Form.Item>
                    <Form.Item
                        className=""
                        required
                        label={"Email"}
                        name={"email"}
                    >
                        <Input type="email"
                            onChange={(e) => {
                                setUserData((prev: any) => {
                                    return {
                                        ...prev,
                                        email: e.target.value
                                    }
                                })
                            } } 
                            placeholder="Enter email" 
                        />
                    </Form.Item>
                    <Form.Item
                        className=""
                        required
                        label={"Password"}
                        name={"password"}
                    >
                        <Input.Password
                            onChange={(e) => {
                                setUserData((prev: any) => {
                                    return {
                                        ...prev,
                                        password: e.target.value
                                    }
                                })
                            } } 
                            placeholder="Enter password" 
                        />
                    </Form.Item>
                </Form>
            </CustomModal>
        </div>
    )
}

export default AddUser