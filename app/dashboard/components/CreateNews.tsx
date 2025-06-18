"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import ProjectsForm from "./reuseable/ProjectsForm"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import { useCreateNewsMutation } from "@/lib/api/newsApiSlice"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { FormContent, modalStateType } from "@/types"
import NewsForm from "./reuseable/NewsForm"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const CreateNews: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>([])

    const [createNews, {isSuccess, isError, error, isLoading: isCreateNewsLoading}] = useCreateNewsMutation()

    const [newsdata, setNewsData] = useState<FormContent>({
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
            tags: [],
            images: []
            
        })

    
    useEffect(() => { // Listening to response status from the request
        if(isError){
            const fetchError = error as FetchBaseQueryError & { // data is undefined in rtk FetchBaseQuerryError type definition, so i extended it to add type to data.
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
        try {
            form.validateFields
            // console.log(newsdata)
            const newFileList = newsdata.images.map((obj: any) => {
                const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const dataToSubmit = {
                ...newsdata,
                images: newFileList
            }
            console.log(dataToSubmit)
            createNews(dataToSubmit)

        } catch (error) {
            console.log("Form submit Failed")
            console.error("Form validation failed:", error);
        }
        
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="ADD_NEWS" loading={isCreateNewsLoading} >
                <NewsForm newsdata={newsdata} setNewsData={setNewsData} form={form} />
            </CustomModal>
        </div>
    )
}

export default CreateNews