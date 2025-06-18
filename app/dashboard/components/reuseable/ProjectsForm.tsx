'use client'

import I18N from "@/i18n"
import { Form, Input, Switch } from "antd"
import TitleContent from "./TitleContent";
import ImageUpload from "./ImageUpload";
import {  useEffect } from "react";
import { CustomFormType, FormContent } from "@/types";
import { usePostProjectImageMutation, useRemoveProjectImageMutation } from "@/lib/api/profileApiSlice";

interface ProjectsFormType extends CustomFormType {
    projectdata: FormContent;
    setProjectData: (value: any) => void;
}

const ProjectsForm: React.FC<ProjectsFormType> = (
        {
            form,
            projectdata,
            setProjectData,
        }
    ) => {

        const [postProjectImage, {}] = usePostProjectImageMutation() 
        const [removeProjectImage, {}] = useRemoveProjectImageMutation()

        useEffect(() => {
            if(projectdata){
                form.setFieldsValue({
                    slug: projectdata.slug,
                    completed: projectdata?.completed
                })
            }
        }, [projectdata])


    return(
        <Form
            className=" w-full h-full "
            form={form}
            layout="vertical"
        >
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={projectdata} setData={setProjectData} locale={"en"} form={form} />
                <TitleContent data={projectdata} setData={setProjectData} locale={"tr"} form={form} />
            </div>
            <Form.Item 
                required
                name={"slug"}
                label={<I18N>SLUG</I18N>}>
                <Input
                    onChange={(e) => {
                        setProjectData((prev: any) => {
                            return {
                                ...prev,
                                slug: e.target.value
                            }
                        })
                    } } 
                    className="inputStyle"
                    placeholder={"İçerik Slug"}
                />
            </Form.Item>
            <Form.Item
                required
                name={"completed"}
                label={<I18N>COMPLETED</I18N>}
            >
                <Switch 
                    value={true}
                    onChange={(value) => {
                        setProjectData((prev: any) => {
                            return{
                                ...prev,
                                completed: value
                            }
                        })
                    }}
                />
            </Form.Item>
            <Form.Item 
                required
                name={"images"}
                label={<I18N>IMAGES</I18N>}
            >
                <ImageUpload setData={setProjectData} fileList={projectdata.images} removeImageApi={removeProjectImage} postImageApi={postProjectImage} />
            </Form.Item>
        </Form>

    )
}

export default ProjectsForm