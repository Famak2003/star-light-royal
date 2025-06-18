import { Form, Input, UploadFile } from "antd"
import CustomModal from "./CustomModal"
import { useEffect, useState } from "react"
import { modalStateType } from "@/types"
import ImageUpload from "./ImageUpload"
import { usePostImageMutation, useRemoveImageMutation } from "@/lib/api/systemApiSlice"
import RichText from "./RichText"

interface AddCarouselType extends modalStateType {
    data?: {
        images: UploadFile<any>[],
        writeup: string
    }
}

const AddCarousel: React.FC<AddCarouselType> = ({isModalVisible, setisModalVisible, data}) => {
    const [postImage] = usePostImageMutation()
    const [removeImage] = useRemoveImageMutation()

    const [carouselImage, setCarouselImage] = useState<{images: UploadFile<any>[]}>({
        images: []
    })

    const [carouselWriteup, setCarouselWriteup] = useState<{content: string}>({
        content: ""
    })
    
    const handleSubmit = () => {
        const newData = { 
            writeup: carouselWriteup,
            images: carouselImage.images
        }
        console.log(newData)
    }

    useEffect(()=> {
        if (data){
            setCarouselImage({
                images: [...data?.images]
            })
            setCarouselWriteup({
                content: data?.writeup
            })
        }

    }, [])

    return(
        <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add Carousel" width={"small"} loading={false}>
            <Form
                layout="vertical"
                className=" w-full h-full "
            >
                <div className=" pl-2 ">
                    <Form.Item
                        label={"Images"}
                        name={"image"}
                    >
                        <ImageUpload 
                            setData={setCarouselImage} 
                            fileList={carouselImage?.images} 
                            multiple={false} 
                            removeImageApi={removeImage} 
                            postImageApi={postImage} 
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        label={"Content"}
                        name={"content"}
                    >
                        <RichText 
                            content={carouselWriteup?.content} 
                            setData={setCarouselWriteup} 
                        />
                    </Form.Item>
                </div>                
            </Form>
        </CustomModal>
    )
}

export default AddCarousel