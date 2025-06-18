import { InboxOutlined } from "@ant-design/icons"
import Dragger from "antd/es/upload/Dragger"
import {ImageUploadProps} from './ImageUpload'
import { useState } from "react";
import { GetProp, Image, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
});

const DragUpload: React.FC<ImageUploadProps> = ({fileList, setData}) => {
     const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setData((prev:any) => {
            return{
                ...prev,
                images: newFileList
            }
        })

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        onChange: handleChange,
        onPreview: handlePreview,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };



    return(
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                
            </Dragger> 
            {   previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )
            }
        </div>
    )
}