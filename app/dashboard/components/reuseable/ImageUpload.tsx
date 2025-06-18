// import I18N from "@/i18n";
import { PlusOutlined } from "@ant-design/icons";
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd"
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { usePostImageMutation, useRemoveImageMutation } from "@/lib/api/systemApiSlice";

export type TPostApi = 
    ReturnType<typeof usePostImageMutation>[0];

export type TRemoveApi = 
    ReturnType<typeof useRemoveImageMutation>[0];

export interface ImageUploadProps {
    fileList: UploadFile[];
    setData: (value: any) => void;
    multiple?: boolean;
    // singleImage?: boolean;
    postImageApi: TPostApi;
    removeImageApi: TRemoveApi;
}


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
});


const ImageUpload: React.FC<ImageUploadProps> = ({
    fileList, 
    setData, 
    multiple=true, 
    removeImageApi, 
    postImageApi

}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const uploadImage = async (value:any) => {
        const formData = new FormData()
        formData.append("file", value.file)

        // Initialise toast
        const toastid = toast.loading("Uploading")
        try {
            const response = await postImageApi(formData).unwrap() // unwrap handles async errors
            console.log(response)
            console.log(response?.link)
            if (response?.link) {
                setData((prev: any) => {
                    return {
                        ...prev,
                        images: [
                            ...prev.images,
                            {uid: Date.now()+'', name: Date.now()+'', url: process.env.NEXT_PUBLIC_BASE+response?.link}
                        ]
                    }}
                )
            }
            toast.success("Uploaded", {id: toastid})
            
        } catch (err: any) {
            if(err.status === "413"){
                toast.error("File too large", {id: toastid})
            }else{
                toast.error("Trouble uploading", {id: toastid})
            }
        } finally{
            toast.dismiss(toastid)
        }
        return true
    }

    const removeImage = async (value: any) => {
        const splitValueArr = value.url.split('/')
        const lastValueIndex = (splitValueArr.length - 1)
        const url = `/${splitValueArr[lastValueIndex]}` // Extracting image url from values array

        // Initialise toast
        const toastid = toast.loading("Removing")
        try {
            await removeImageApi(url).unwrap() // Removes image
            const newFileList = fileList.map(Obj => Obj).filter((item) => (item.url !== value.url))
            setData((prev:any) => {
                return{
                    ...prev,
                    images: newFileList
                }
            })
            toast.success("Image removed", {id: toastid})
        } catch (error) {
            toast.error("Something went wrong", {id: toastid})
        } finally {
            toast.dismiss(toastid)
        }
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );
    
    return(
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                multiple={multiple}
                onPreview={handlePreview}
                customRequest={uploadImage}
                onRemove={removeImage}
                
            >
            { 
                !multiple ?  // checks if it should only allow a single image
                    fileList?.length >= 1 ?
                        null : 
                    uploadButton 
                    :
                uploadButton 
            }
            </Upload>
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
        </>
    )
}

export default ImageUpload