"use client"

import I18N from "@/i18n"
import { Modal } from "antd"
import { ReactNode } from "react";

interface EditModalType {
    isEditModalVisible: boolean;
    setisEditModalVisible: (visible: boolean) => void;
    handleSubmit: () => void;
    title: string
    loading: boolean;
    children: ReactNode;
}

const EditModal: React.FC<EditModalType> = ({title, handleSubmit, setisEditModalVisible, loading, isEditModalVisible, children}) => {
    return(
        <Modal
            title={ <h1 className=" uppercase font-bold text-[20px] "><I18N>{title}</I18N></h1> }
            open={isEditModalVisible}
            width={"90%"}
            className='  '
            okText={"Submit"}
            onOk={() => handleSubmit()}
            confirmLoading={loading}
            onCancel={() => setisEditModalVisible(false)} 
            onClose={() => setisEditModalVisible(false)}
        >
            {children}
        </Modal>
    )
}

export default EditModal