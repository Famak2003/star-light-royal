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
// import { useEditEventsMutation } from "@/lib/api/EventsApiSlice"
// import EventsForm from "./reuseable/EventsForm"
import { setAllEvents } from "@/lib/slices/eventsSlice"
import { useEditEventsMutation } from "@/lib/api/eventsApiSlice"
import EventsForm from "./reuseable/EventsForm"
// import EventsForm from "./reuseable/EventsForm"
// import { setAllEvents } from "@/lib/slices/EventsSlice"


interface EditEventsType extends modalStateType {
    data: IndividualType
}

const EditEvents: React.FC<EditEventsType> = ({ data, isModalVisible, setisModalVisible}) => {
    const dispatch = useDispatch()
    const allEvents = useSelector((state: RootState) => state.events.allEvents)
    const imagesObj = data?.images?.map((value, idx) => {
        return {
            uid: `${idx}_${Date.now()} `,
            name: `${data.slug} image${idx + 1}`,
            url:  process.env.NEXT_PUBLIC_BASE + value
        }
    })

    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>(imagesObj)

    const [editEvents, {isSuccess, isError, isLoading: isEditEventsLoading}] = useEditEventsMutation()

    const [eventsData, setEventsData] = useState<IndividualType>({
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
        type: "",
        datetime: "",
        display_image: data.display_image,
        updated_at: data.updated_at,
        total: data.total
    })

    useEffect(() => {
        if (data){
            // setFileList(imagesObj)

            setEventsData(() => {
                return {
                    ...data,
                    images: imagesObj
                }
            })
        }
    }, [data])

    // console.log("Edit Events ==> ", data)

    
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
            const newFileList = eventsData.images?.map((obj: any) => {
                const newUrl = obj?.url?.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const timestamp = new Date().toISOString();
            const dataToSubmit = {
                ...eventsData,
                images: newFileList,
                updated_at: timestamp
            }

            console.log(dataToSubmit)

            editEvents({ EventsData: dataToSubmit, id: eventsData.id }) // Fire Api to edit events

            const newData = allEvents.data.filter((obj: any) => { // Append hot changes to redux to populate ui immediately before another API fetch
                return obj.id !== eventsData.id
            })
            newData.push(dataToSubmit)
            dispatch(setAllEvents({ // update events to reflect changes immediately
                ...allEvents,
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
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="EDIT_EVENTS" loading={isEditEventsLoading} >
                <EventsForm form={form} eventsdata={eventsData} setEventsData={setEventsData} />
            </CustomModal>
        </div>
    )
}

export default EditEvents