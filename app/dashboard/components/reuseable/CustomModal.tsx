// import I18N from "@/i18n";
import { Modal } from "antd"
import { ReactNode } from "react";

interface CustomModalProps {
    isModalVisible: boolean;
    setisModalVisible: (visible: boolean) => void;
    handleSubmit: () => void;
    title: string;
    loading?: boolean;
    children: ReactNode;
    width?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ handleSubmit, isModalVisible, setisModalVisible, width="", title, loading, children}) => {

    return(
        <Modal 
            title={ <h1 className=" uppercase font-bold text-[20px] ">{title}</h1> }
            open={isModalVisible}
            // width={width}
            className={` ${ width === "small" ? ` !w-[90%] md:!w-[70%] lg:!w-[50%]` : " !w-100% sm:!w-[90%] md:!w-[100%]" } `}
            okText={"Submit"}
            onOk={() => handleSubmit()}
            confirmLoading={loading}
            onCancel={() => setisModalVisible(false)} 
            // onClose={() => setisModalVisible(false)}
        >
            <div className=" flex flex-col gap-6 min-h-[150px] ">
                {children}
            </div>
        </Modal>
    )
}

export default CustomModal