"use client"

import React, { useEffect, useState } from "react"
import CustomModal from "./reuseable/CustomModal"
import ProjectsForm from "./reuseable/ProjectsForm"
import { UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEditProjectMutation } from "@/lib/api/profileApiSlice"
import toast from "react-hot-toast"
import I18N from "@/i18n"
import { RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { setAllProjects } from "@/lib/slices/profileSlice"
import { IndividualType, modalStateType } from "@/types"


interface EditProjectType extends modalStateType {
    data: IndividualType
}

const EditProject: React.FC<EditProjectType> = ({ data, isModalVisible, setisModalVisible}) => {
    const dispatch = useDispatch()
    const allProject = useSelector((state: RootState) => state.projects.allProjects)
    const imagesObj = data?.images?.map((value, idx) => {
        return {
            uid: `${idx}_${Date.now()} `,
            name: `${data.slug} image${idx + 1}`,
            url: process.env.NEXT_PUBLIC_BASE + value
        }
    })

    const [form] = useForm()
    // const [fileList, setFileList] = useState<UploadFile[]>(imagesObj)

    const [editProject, {isSuccess, isError, isLoading: isEditProjectLoading}] = useEditProjectMutation()

    const [projectdata, setProjectData] = useState<IndividualType>({
        title: {
            en: data?.title?.en,
            tr: data?.title?.tr
        },
        content: {
            en: "",
            tr: ""
        },
        completed: true,
        slug: data?.slug,
        images: imagesObj,
        id: data.id,
        display_image: data.display_image,
        updated_at: data.updated_at,
        total: data.total
    })

    useEffect(() => {
        if (data){
            // setFileList(imagesObj)

            setProjectData(() => {
                return {
                    ...data,
                    images: imagesObj
                }
            })
        }
    }, [data])

    
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
            const newFileList = projectdata.images.map((obj: any) => {
                const newUrl = obj.url.replace(process.env.NEXT_PUBLIC_BASE, '')
                return newUrl
            })
            const timestamp = new Date().toISOString()
            const dataToSubmit = {
                ...projectdata,
                images: newFileList,
                updated_at: timestamp
            }

            console.log(dataToSubmit)

            editProject({ projectData: dataToSubmit, id: projectdata.id }) // Fire Api to edit project

            const newData = allProject.data.filter((obj: any) => {
                return obj.id !== projectdata.id
            })

            newData.push(dataToSubmit)
            dispatch(setAllProjects({ // update projects to reflect changes immediately
                ...allProject,
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
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="EDIT_PROJECT" loading={isEditProjectLoading} >
                <ProjectsForm form={form} projectdata={projectdata} setProjectData={setProjectData} />
            </CustomModal>
        </div>
    )
}

export default EditProject