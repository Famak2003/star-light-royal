"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { FormContent, modalStateType } from "@/types"
// import EventsForm from "./reuseable/EventsForm"
// import { useCreateEventsMutation } from "@/lib/api/announcementApiSlice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import EventsForm from "./reuseable/EventsForm"
import { useCreateEventsMutation } from "@/lib/api/eventsApiSlice"

const CreateEvents: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>([])

    const [createEvents, {isSuccess, isError, error, isLoading: isCreateEventsLoading}] = useCreateEventsMutation()

    const [eventsData, setEventsData] = useState<FormContent>({
        title: {
            en: "",
            tr: ""
        },
        content: {
            en: "",
            tr: ""
        },
        type: "",
        datetime: "",
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
                console.log(eventsData)
                const newFileList = eventsData.images.map((obj: any) => {
                    const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '') // Removing backend url from the image rul before appending it to the data to submit
                    return newUrl
                })
                const dataToSubmit = { // add images to the eventsData
                    ...eventsData,
                    images: newFileList
                }
                console.log(dataToSubmit)
                createEvents(dataToSubmit)
    
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
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="ADD_EVENT" loading={isCreateEventsLoading} >
                <EventsForm eventsdata={eventsData} setEventsData={setEventsData} form={form} />
            </CustomModal>
        </div>
    )
}

export default CreateEvents