'use client'

import I18N from "@/i18n"
import { Button, Divider, Form, Input, InputRef, Select, Space, Switch } from "antd"
import TitleContent from "./TitleContent";
import ImageUpload from "./ImageUpload";
import { useEffect, useRef, useState } from "react";
import { CustomFormType, FormContent } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { usePostAnnouncementImageMutation, useRemoveAnnouncementImageMutation } from "@/lib/api/announcementApiSlice";

interface AnnouncementFormType extends CustomFormType{
    announcementdata: FormContent;
    setAnnouncementData: (value: any) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormType> = 
    ({ form, announcementdata, setAnnouncementData }) => {
        const [postAnnouncementImage, {}] = usePostAnnouncementImageMutation()
        const [removeAnnouncementImage, {}] = useRemoveAnnouncementImageMutation()
        useEffect(() => {
            if(announcementdata){
                form.setFieldsValue({
                    slug: announcementdata.slug,
                    visible: announcementdata?.visible,
                    tags: announcementdata?.tags
                })
            }
        }, [announcementdata])

        console.log("image data from announcement form", announcementdata.images)

    return(
        <Form
            className=" w-full h-full "
            form={form}
            layout="vertical"
        >
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={announcementdata} setData={setAnnouncementData} locale={"en"} form={form} />
                <TitleContent data={announcementdata} setData={setAnnouncementData} locale={"tr"} form={form} />
            </div>
            <Form.Item 
                required
                name={"slug"}
                label={<I18N>SLUG</I18N>}>
                <Input
                    onChange={(e) => {
                        setAnnouncementData((prev: any) => {
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
                name={"visible"}
                label={<I18N>VISIBLE</I18N>}
            >
                <Switch 
                    value={true}
                    onChange={(value) => {
                        setAnnouncementData((prev: any) => {
                            return{
                                ...prev,
                                visible: value
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
                <ImageUpload setData={setAnnouncementData} fileList={announcementdata.images} multiple={false} removeImageApi={removeAnnouncementImage} postImageApi={postAnnouncementImage}  />
            </Form.Item>
        </Form>

    )
}

export default AnnouncementForm