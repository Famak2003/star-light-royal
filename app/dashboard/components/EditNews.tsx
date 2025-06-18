"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { useEditNewsMutation } from "@/lib/api/newsApiSlice"
import NewsForm from "./reuseable/NewsForm"
import { setAllNews } from "@/lib/slices/newsSlice"
import { IndividualType, modalStateType } from "@/types"


interface EditNewsType extends modalStateType {
    data: IndividualType
}

const EditNews: React.FC<EditNewsType> = ({ data, isModalVisible, setisModalVisible}) => {
    const dispatch = useDispatch()
    const allNews = useSelector((state: RootState) => state.news.allNews)
    const imagesObj = data?.images?.map((value, idx) => {
        return {
            uid: `${idx}_${Date.now()} `,
            name: `${data.slug} image${idx + 1}`,
            url:  process.env.NEXT_PUBLIC_BASE + value
        }
    })

    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>(imagesObj)

    const [editNews, {isSuccess, isError, isLoading: isEditNewsLoading}] = useEditNewsMutation()

    const [newsdata, setNewsData] = useState<IndividualType>({
        title: {
            en: data?.title?.en,
            tr: data?.title?.tr
        },
        content: {
            en: "",
            tr: ""
        },
        visible: true,
        slug: data?.slug,
        images: imagesObj,
        tags: [],
        id: data.id,
        display_image: data.display_image,
        updated_at: data.updated_at,
        total: data.total
    })

    useEffect(() => {
        if (data){
            // setFileList(imagesObj)

            setNewsData(() => {
                return {
                    ...data,
                    images: imagesObj
                }
            })
        }
    }, [data])

    console.log(data)

    
    useEffect(() => {
        if(isError){
            toast.error(<I18N>SOMETHING_WENT_WRONG</I18N>)
        }
        if(isSuccess){
            toast.success(<I18N>UPDATED_SUCCESFULLY</I18N>)
        }
    }, [isError, isSuccess])

    const handleSubmit = async () => {
        try {
            form.validateFields
            const newFileList = newsdata.images.map((obj: any) => {
                const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const timestamp = new Date().toISOString()
            const dataToSubmit = {
                ...newsdata,
                images: newFileList,
                updated_at: timestamp
            }

            editNews({ newsData: dataToSubmit, id: newsdata.id }) // Fire Api to edit project

            const newData = allNews.data.filter((obj: any) => {
                return obj.id !== newsdata.id
            })
            newData.push(dataToSubmit)
            dispatch(setAllNews({ // update projects to reflect changes immediately
                ...allNews,
                data: [
                    ...newData
                ]
            }))

        } catch (error) {
            toast.error(<I18N>SOMETHING_WENT_WRONG</I18N>)
            console.log("Form submit Failed")
            console.error("Form validation failed:", error);
        }
        
    }
    return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="EDIT_NEWS" loading={isEditNewsLoading} >
                <NewsForm form={form} newsdata={newsdata} setNewsData={setNewsData} />
            </CustomModal>
        </div>
    )
}

export default EditNews