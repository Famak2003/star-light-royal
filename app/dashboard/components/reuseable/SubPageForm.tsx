"use client"

import I18N from "@/i18n"
import { CustomFormType, FormContent, PageFormType } from "@/types";
import { Button, Form, Input, Select } from "antd"
import OfficialMessage from "./OfficialMessage";
import { useEffect, useState } from "react";
import { SubPagesDataType } from "../CreateSubpage";
import Writeup from "./Writeup";
import GridLayout from "./GridLayout";
import ManagementNote from "./ManagementNote";
import { InboxOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSub_Pages } from "@/lib/slices/pagesSlice";

interface SubpageFormType extends CustomFormType {
    data: SubPagesDataType;
    setData: (value:any) => void;
    // sub_pages: FormContent[];
    // setSub_Pages: (value:any) => void;
}

const SubPageForm: React.FC<SubpageFormType> = ({data, setData, form}) => {
    const dispatch = useAppDispatch()
    const sub_pages = useAppSelector((state) => state.pages.sub_pages)
    const [type, setType] = useState("")
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>, locale: string) => {
        const newValue = e.target.value;
        setData((prev: any) => ({
            ...prev,
            title: {
                ...prev.title,
                [locale]: newValue,
            },
        }));
    }

    const ChooseChildrenForm = (type: string, key: number) => {
        // console.log("KEY from ChooseChildrenForm", key)
        switch (type) {
            case "official_message":
                // return <OfficialMessage index={key} key={key} form={form} />
            case "write_up":
                return <Writeup index={key} key={key} form={form} />
            case "grid layout":
                // return <GridLayout index={key} key={key} form={form} />
            case "management_note":
                return <ManagementNote index={key} key={key} form={form} />
            default:
                return (
                    <div className="flex flex-col justify-center items-center h-[60px] " >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined className=" text-[50px] text-gray-500 " />
                        </p>
                        <p className=" italic font-semibold text16 text-gray-500 ">No data, Choose from Type</p>
                    </div>
                )
        }
    }
    
    const handleSelect = (e:any) => {
        // console.log(e)
        setType(e)    
        setData((prev: any) => ({
            ...prev,
            type: e
        }));
    }

    const handleDuplicate = () => {
        const newSub_Page = {
            title: {
                en: "",
                tr: ""
            },
            content: {
                en: "",
                tr: ""
            },
            slug: "",
            images: []
        }
        dispatch(setSub_Pages( [
            ...sub_pages,
            {...newSub_Page}
        ]))
    }

    const handleRemove = () => {
        const newSub_Page = sub_pages
        newSub_Page.pop()
        console.log("Poped data", newSub_Page)
        dispatch(setSub_Pages([
            ...newSub_Page
        ]))
    }

    useEffect(() => { // Pre fill all formdata
        if (data){
            form.setFieldsValue({
                titleEN: data.title.en,
                titleTR: data.title.tr,
                slug: data.slug,
                type: data.type
            })
        }
    }, [])

    useEffect(() => {
        console.log("Changed")
        dispatch(setSub_Pages([{
            title: {
                en: "",
                tr: ""
            },
            content: {
                en: "",
                tr: ""
            },
            slug: "",
            images: []
        }]))
    }, [type])
    console.log(sub_pages)

    // console.log(data)

    return(
        <Form 
            className=" w-full h-full pb-6"
            form={form}
            layout="vertical"
        >
            <div className=" flex flex-col md:flex-row justify-between items-start w-full h-fit gap-3 " >
                <div className=" flex flex-col w-full" >
                    <h1 className=" text16 p-3 rounded-md bg-gray-300 md:bg-transparent italic uppercase" >EN</h1>
                    <Form.Item
                        required
                        name={`titleEN`}
                        label={ "Page Title" }
                        className=" w-full"
                    >
                        <Input className=" w-full inputStyle" value={data.title?.en} onChange={(e) => handleTitle(e, 'en')} placeholder={`Input Title here`} />
                    </Form.Item>
                </div>
                <div className=" flex flex-col w-full " >
                    <h1 className=" text16 p-3 rounded-md bg-gray-300 md:bg-transparent italic uppercase" >TR</h1>
                    <Form.Item
                        required
                        name={`titleTR`}
                        label={ "Sayfa Başlığı" }
                        className=" w-full"
                    >
                        <Input className=" w-full inputStyle" value={data.title?.tr} onChange={(e) => handleTitle(e, 'tr')} placeholder={"Başlığı buraya girin"} />
                    </Form.Item>
                </div>
            </div>
            <Form.Item 
                required
                name={"slug"}
                label={<I18N>SLUG</I18N>}>
                <Input
                    onChange={(e) => {
                        setData((prev: any) => {
                            return { 
                                ...prev,
                                slug: e.target.value
                            }
                        })
                    } } 
                    // value
                    className="inputStyle"
                    placeholder={"İçerik Slug"}
                />
            </Form.Item>
            <Form.Item
                required
                name={`type`}
                label={ "Type" }
                className=" w-full md:w-1/2 "
            >
                <Select 
                    onChange={handleSelect}
                    className="inputStyle"
                    defaultValue={["no content"]}
                    options={
                        [
                            {name: '', value: 'Empty'}, 
                            {name: 'project', value: 'project'}, 
                            {name: 'event', value: 'event'},
                            {name: 'announcement', value: 'announcement'}, 
                            {name: 'news', value: 'news'}, 
                            {name: 'official_message', value: 'official_message'}, 
                            {name: 'write_up', value: 'write_up'}, 
                            {name: 'management_note', value: 'management_note'}, 
                            {name: 'grid_layout', value: 'grid layout'}
                        ]
                    }
                />
            </Form.Item>

            <hr className=" border-dark_yellow border-[1px] my-3 " />

            {
                sub_pages?.map((_, idx) => {
                    return (
                        <div key={idx} className=" border-dark_yellow border-[1px] border-dashed rounded-md p-4 mb-4 " >
                            {ChooseChildrenForm(type, idx)}
                        </div>
                    )
                }) 
            }
            {
                type === "write_up" || type === "official_message"
                ? null
                : (
                  <div className="flex justify-between w-full h-fit">
                    <Button className="text-white bg-dark_yellow" onClick={handleDuplicate}>
                      Add
                    </Button>
                    <Button className="text-white bg-dark_yellow" onClick={handleRemove}>
                      Remove
                    </Button>
                  </div>
                )
            }
        </Form>
    )
}

export default SubPageForm;