"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { FormContent, modalStateType } from "@/types"
import AnnouncementForm from "./reuseable/AnnouncementForm"
import { useCreateAnnouncementMutation } from "@/lib/api/announcementApiSlice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"


const CreateAnnouncement: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>([])

    const [createAnnouncement, {isSuccess, isError, error, isLoading: isCreateAnnouncementLoading}] = useCreateAnnouncementMutation()

    const [announcementdata, setAnnouncementData] = useState<FormContent>({
            title: {
                en: "",
                tr: ""
            },
            content: {
                en: "",
                tr: ""
            },
            visible: false,
            slug: "",
            images: []
        })

    
    useEffect(() => { // Listening to response status from the request
        if(isError){
            const fetchError = error as FetchBaseQueryError & { // data is undefined in rtk FetchBaseQuerryError type definition, so i extended it to add type data.
                data: {
                    message: string;
                    errors: {
                        slug: string[]
                    }
                }
            }
            if (fetchError?.status === 422){
                toast.error(fetchError?.data?.message)
            }else{
                toast.error(<I18N>SOMETHING_WENT_WRONG</I18N>)
            }
        }
        if(isSuccess){
            toast.success(<I18N>UPDATED_SUCCESFULLY</I18N>)
        }
    }, [isError, isSuccess])

    const handleSubmit = async () => {
        form.validateFields().then(() =>{
            try {
                console.log(announcementdata)
                const newFileList = announcementdata.images.map((obj: any) => {
                    const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '') // Removing backend url from the image rul before appending it to the data to submit
                    return newUrl
                })
                const dataToSubmit = { // add images to the announcementdata
                    ...announcementdata,
                    images: newFileList
                }
                console.log(dataToSubmit)
                createAnnouncement(dataToSubmit)
    
            } catch (error) {
                console.log("Form submit Failed")
                console.error("Form validation failed:", error);
            }
        }).catch(() => {
            toast.error("All form fields must be filled")
        })
        
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="ADD_ANNOUNCEMENT" loading={isCreateAnnouncementLoading} >
                <AnnouncementForm announcementdata={announcementdata} setAnnouncementData={setAnnouncementData} form={form} />
            </CustomModal>
        </div>
    )
}

export default CreateAnnouncement