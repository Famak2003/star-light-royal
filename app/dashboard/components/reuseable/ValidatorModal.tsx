import I18N from "@/i18n";
import { Modal } from "antd"
import { ReactNode } from "react";

interface ValidatorModalProps {
    isModalVisible: boolean;
    setisModalVisible: (visible: boolean) => void;
    handleSubmit: () => void;
    title: string
    loading: boolean;
    children: ReactNode;
}

const ValidatorModal: React.FC<ValidatorModalProps> = ({ handleSubmit, isModalVisible, setisModalVisible, title, loading, children}) => {

    return(
        <Modal 
            title={ <h1 className=" uppercase font-bold text-[20px] "><I18N>{title}</I18N></h1> }
            open={isModalVisible}
            width={"40%"}
            className='  '
            okText={"Submit"}
            onOk={() => handleSubmit()}
            confirmLoading={loading}
            onCancel={() => setisModalVisible(false)} 
            onClose={() => setisModalVisible(false)}
        >
            <div className=" flex flex-col gap-6 ">
                {children}
            </div>
        </Modal>
    )
}

export default ValidatorModal