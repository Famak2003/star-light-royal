"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { IndividualType, modalStateType } from "@/types"
import { useEditAnnouncementMutation } from "@/lib/api/announcementApiSlice"
import AnnouncementForm from "./reuseable/AnnouncementForm"
import { setAllAnnouncement } from "@/lib/slices/announcementSlice"


interface EditAnnouncementType extends modalStateType {
    data: IndividualType
}

const EditAnnouncement: React.FC<EditAnnouncementType> = ({ data, isModalVisible, setisModalVisible}) => {
    const dispatch = useDispatch()
    const allAnnouncement = useSelector((state: RootState) => state.announcement.allAnnouncement)
    const imagesObj = data?.images?.map((value, idx) => {
        return {
            uid: `${idx}_${Date.now()} `,
            name: `${data.slug} image${idx + 1}`,
            url:  process.env.NEXT_PUBLIC_BASE + value
        }
    })
    // console.log(process.env.NEXT_PUBLIC_BASE)
    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>(imagesObj)

    const [editAnnouncement, {isSuccess, isError, isLoading: isEditAnnouncementLoading}] = useEditAnnouncementMutation()

    const [announcementdata, setAnnouncementData] = useState<IndividualType>({
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

            setAnnouncementData(() => {
                return {
                    ...data,
                    images: imagesObj
                }
            })
        }
    }, [data])

    // console.log("Edit Announcement ==> ", data)

    
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
            const newFileList = announcementdata.images?.map((obj: any) => {
                const newUrl = obj?.url?.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const timestamp = new Date().toISOString();
            const dataToSubmit = {
                ...announcementdata,
                images: newFileList,
                updated_at: timestamp
            }

            console.log(dataToSubmit)

            editAnnouncement({ AnnouncementData: dataToSubmit, id: announcementdata.id }) // Fire Api to edit announcement

            const newData = allAnnouncement.data.filter((obj: any) => { // Append hot changes to redux to populate ui immediately before another API fetch
                return obj.id !== announcementdata.id
            })
            newData.push(dataToSubmit)
            dispatch(setAllAnnouncement({ // update announcement to reflect changes immediately
                ...allAnnouncement,
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
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="EDIT_ANNOUNCEMENT" loading={isEditAnnouncementLoading} >
                <AnnouncementForm form={form} announcementdata={announcementdata} setAnnouncementData={setAnnouncementData} />
            </CustomModal>
        </div>
    )
}

export default EditAnnouncement