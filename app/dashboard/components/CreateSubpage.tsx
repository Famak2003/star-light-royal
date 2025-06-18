"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import toast from "react-hot-toast"
import { FormContent, modalStateType, PagesDataType } from "@/types"
import PageForm from "./reuseable/PageForm"
import { useCreatePageMutation } from "@/lib/api/pagesApiSlice"
// import { PagesDataType } from "@/lib/slices/pagesSlice"
import I18N from "@/i18n"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import SubPageForm from "./reuseable/SubPageForm"

export interface SubPagesDataType extends PagesDataType {
    type: string;
    slug: string;
    sub_pages: FormContent[]
}


const CreateSubPage: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>([])
    const [sub_pages, setSub_Pages] = useState<FormContent[]>([])

    // {
    //     title: {
    //         en: "",
    //         tr: ""
    //     },
    //     content: {
    //         en: "",
    //         tr: ""
    //     },
    //     slug: "",
    //     images: []
    // }

    // const [createSubPage, {isSuccess, isError, error, isLoading: isCreateSubPageLoading}] = useCreateSubPageMutation()

    const [SubPagedata, setSubPageData] = useState<SubPagesDataType>({
            title: {
                en: "",
                tr: ""
            },
            type: "",
            slug: "",
            sub_pages: [],
            id: 0
        }
    )

    
    // useEffect(() => { // Listening to response status from the request
    //     if(isError){
    //         const fetchError = error as FetchBaseQueryError & { // data is undefined in rtk FetchBaseQuerryError type definition, so i extended it to add type data.
    //             data: {
    //                 message: string;
    //                 errors: {
    //                     slug: string[]
    //                 }
    //             }
    //         }
    //         if (fetchError?.status === 422){
    //             toast.error(fetchError?.data?.message)
    //         }else{
    //             toast.error(<I18N>SOMETHING_WENT_WRONG</I18N>)
    //         }
    //     }
    //     if(isSuccess){
    //         toast.success(<I18N>UPDATED_SUCCESFULLY</I18N>)
    //     }
    // }, [isError, isSuccess])

    const handleSubmit = async () => {
        form.validateFields().then(() =>{
            try {
                const newSub_Pages = sub_pages.map((obj: any, key) => {
                    return {
                        ...obj,
                        images: obj.images.map((obj: any) => {
                            const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                            return newUrl
                        })
                    }
                })
                // const newFileList = fileList.map((obj: any) => {
                //     const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                //     return newUrl
                // })
                const dataToSubmit = {
                    ...SubPagedata,
                    sub_pages:
                        [...newSub_Pages],
                }
                console.log(dataToSubmit)
                // createSubPage(SubPagedata)
    
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
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="ADD_SUBPAGE"  >
                {/* <SubPageForm pagedata={SubPagedata} setSubPageData={setSubPageData} form={form} fileList={fileList} setFileList={setFileList} /> */}
                <SubPageForm data={SubPagedata} setData={setSubPageData} sub_pages={sub_pages} setSub_Pages={setSub_Pages} form={form} />
            </CustomModal>
        </div>
    )
}

export default CreateSubPage