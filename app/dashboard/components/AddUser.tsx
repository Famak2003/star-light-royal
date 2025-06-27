import { Form, Input } from "antd"
import CustomModal from "./reuseable/CustomModal"
import { useEffect, useState } from "react"
import { modalStateType } from "@/types"
import { addUserType, useAddUserMutation, useEditUserMutation } from "@/lib/api/userApiSlice"

interface AddUserType extends modalStateType {
    data?: addUserType    
}

const AddUser: React.FC<AddUserType> = ({isModalVisible, setisModalVisible, data}) => {
    const [form] = Form.useForm();
    const [addUser, {isLoading, isSuccess}] = useAddUserMutation()
    const [editUser, {isloading: isEditLoading, isSuccess: isEditSucess}] = useEditUserMutation()
    const [userData, setUserData] = useState<addUserType>({
        id: null,
        email: "",
        name: "",
    })

    console.log("dtata", data)

    useEffect(() => {
        if (data){
            setUserData({
                id: data?.id, 
                name: data?.name, 
                email: data?.email
            })
        }
        form.setFieldsValue({
            name: data?.name,
            email: data?.email
        })
    }, [data])

    const handleSubmit = () => {
        if(data){
            return editUser({ id: data?.id, obj: userData})
        }
        console.log(userData)
        return addUser(userData)
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add Team Member" width={"small"} loading={false}>
                <Form
                    form={form}
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
                            // defaultValue={userData?.name}                            
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
                            // defaultValue={userData?.email}
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
                </Form>
            </CustomModal>
        </div>
    )
}

export default AddUser