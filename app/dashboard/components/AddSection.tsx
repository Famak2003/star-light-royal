import { v4 as uuidv4 } from 'uuid'
import { Form, Input, UploadFile } from "antd"
import CustomModal from "./reuseable/CustomModal"
import { useEffect, useState } from "react"
import { modalStateType } from "@/types"
import { usePostImageMutation, useRemoveImageMutation } from "@/lib/api/systemApiSlice"
import ImageUpload from "./reuseable/ImageUpload"
import RichText from "./reuseable/RichText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import TextArea from "antd/es/input/TextArea"

export interface sectionData {
    title: string,
    images: UploadFile<any>[],
    content: string,
    curriculum: [
        { text: string, id: string }
    ],
    scholarship: [
        { text: string, content: string, id: string }
    ],
    
}

interface AddSectionType extends modalStateType {
    data?: sectionData
    section?: string
}

const AddSection: React.FC<AddSectionType> = ({isModalVisible, setisModalVisible, data, section}) => {
    const [sectionData, setSectionData] = useState<sectionData>({
        title: "",
        images: [],
        content: "",
        curriculum: [
            { text: "", id: uuidv4() }
        ],
        scholarship: [
            { text: "", content: "", id: uuidv4() }
        ],
    })
    const [postImage] = usePostImageMutation()
    const [removeImage] = useRemoveImageMutation()
    const handleSubmit = () => {
        console.log(sectionData)
    }

    useEffect(()=> {
        if (data){
            setSectionData( (prev): any => {
                return {
                    ...data
                }
            })
        }

    }, [])

    // console.log(sectionData?.curriculum)
    
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add Section" width={"large"} loading={false}>
                <Form
                    layout="vertical"
                    className=" w-full h-full "
                >
                    <Form.Item
                        label={"Images"}
                        name={"image"}
                    >
                        <ImageUpload 
                            setData={setSectionData} 
                            fileList={sectionData?.images} 
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
                        <RichText content={sectionData?.content} setData={setSectionData} />
                    </Form.Item>
                    {
                        section === "curriculum" && (
                            <Form.Item
                                label={"Curriculum"}
                                name={"curriculum"}
                            >
                                <ul className=" px-2 flex flex-col gap-2 ">
                                    {
                                        sectionData?.curriculum.map(({text, id}, idx) => {
                                            return(
                                                <li key={`${id}`} className=" flex gap-2 ">
                                                    <Input defaultValue={text} className=" input " placeholder="Enter curriculum name" 
                                                        onChange={(e) => setSectionData((prev): any => {
                                                            const newArr = [...prev.curriculum]
                                                            newArr[idx].text = e.target.value
                                                            return {
                                                                ...prev,
                                                                curriculum: newArr
                                                            }
                                                        })} 
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            if (sectionData?.curriculum.length <= 1){
                                                                return
                                                            }else{
                                                                setSectionData((prev: any) => {
                                                                    const newArr = [...prev?.curriculum]
                                                                    newArr.splice(idx, 1)
                                                                    return {
                                                                        ...prev,
                                                                        curriculum: [...newArr]
                                                                    }
                                                                })
                                                            }
                                                        }}
                                                        className=" p-2 w-fit rounded-lg ring-1 ring-accent"
                                                    >
                                                        <FontAwesomeIcon className=" text-[14px] " icon={faTrash} />
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                    <button 
                                        onClick={() => setSectionData((prev): any => {
                                            const newArr = [...prev.curriculum]
                                            newArr.push({text: "", id: uuidv4()})
                                            return {
                                                ...prev,
                                                curriculum: [...newArr]
                                            }
                                        })}
                                        className=" p-2 w-fit rounded-lg ring-1 ring-accent"
                                    >
                                        <FontAwesomeIcon className=" text-[14px]  " icon={faPlus} />
                                    </button>
                                </ul>
                            </Form.Item>
                        )
                    }
                    {
                        section === "scholarship" && (
                            <Form.Item
                                label={"Scholarship"}
                                name={"scholarship"}
                            >
                                <ul className=" px-2 flex flex-col gap-2 ">
                                    {
                                        sectionData?.scholarship.map(({text, content, id}, idx) => {
                                            return(
                                                <li key={`${id}`} className=" flex justify-center items-center gap-2 ">
                                                    <div className=" flex flex-col gap-2 w-full ">
                                                        <Input defaultValue={text} className=" input " placeholder="Enter scholarship name..." 
                                                            onChange={(e) => setSectionData((prev): any=> {
                                                                const newArr = [...prev.scholarship]
                                                                newArr[idx].text = e.target.value
                                                                return {
                                                                    ...prev,
                                                                    scholarship: newArr
                                                                }
                                                            })} 
                                                        />
                                                        <TextArea 
                                                            className=" !h-[100px] "
                                                            placeholder="Enter about scholarship..."
                                                            defaultValue={content}
                                                            onChange={(e) => setSectionData((prev): any => {
                                                                const newArr = [...prev.scholarship]
                                                                newArr[idx].content = e.target.value
                                                                return {
                                                                    ...prev,
                                                                    scholarship: newArr
                                                                }
                                                            })}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            if (sectionData?.scholarship.length <= 1){
                                                                return
                                                            }else{
                                                                setSectionData((prev: any) => {
                                                                    const newArr = [...prev?.scholarship]
                                                                    newArr.splice(idx, 1)
                                                                    return {
                                                                        ...prev,
                                                                        scholarship: [...newArr]
                                                                    }
                                                                })
                                                            }
                                                        }}
                                                        className=" p-2 w-fit rounded-lg ring-1 ring-accent"
                                                    >
                                                        <FontAwesomeIcon className=" text-[14px] " icon={faTrash} />
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                    <button 
                                        onClick={() => setSectionData((prev): any => {
                                            const newArr = [...prev.scholarship]
                                            newArr.push({text: "", content: "", id: uuidv4()})
                                            return {
                                                ...prev,
                                                scholarship: [...newArr]
                                            }
                                        })}
                                        className=" p-2 w-fit rounded-lg ring-1 ring-accent"
                                    >
                                        <FontAwesomeIcon className=" text-[14px]  " icon={faPlus} />
                                    </button>
                                </ul>
                            </Form.Item>
                        )
                    }
                </Form>
            </CustomModal>
        </div>
    )
}

export default AddSection