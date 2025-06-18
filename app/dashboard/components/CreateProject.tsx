"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import ProjectsForm from "./reuseable/ProjectsForm"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import { useCreateProjectMutation } from "@/lib/api/profileApiSlice"
import { LocaleType } from "../projects/page"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { FormContent, modalStateType } from "@/types"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const CreateProject: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>([])

    const [createProject, {isSuccess, isError, error, isLoading: isCreateProjectLoading}] = useCreateProjectMutation()

    const [projectdata, setProjectData] = useState<FormContent>({
            title: {
                en: "",
                tr: ""
            },
            content: {
                en: "",
                tr: ""
            },
            completed: false,
            slug: "",
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
            console.log(projectdata)
            const newFileList = projectdata.images.map((obj: any) => {
                const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const dataToSubmit = {
                ...projectdata,
                images: newFileList
            }
            console.log(dataToSubmit)
            createProject(dataToSubmit)

        } catch (error) {
            console.log("Form submit Failed")
            console.error("Form validation failed:", error);
        }
        
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="ADD_PROJECT" loading={isCreateProjectLoading} >
                <ProjectsForm projectdata={projectdata} setProjectData={setProjectData} form={form} />
            </CustomModal>
        </div>
    )
}

export default CreateProject