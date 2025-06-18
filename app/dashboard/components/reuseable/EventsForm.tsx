'use client'

import I18N from "@/i18n"
import { DatePicker, Form, Input, TimePicker } from "antd"
import TitleContent from "./TitleContent";
import ImageUpload from "./ImageUpload";
import { useEffect, useRef, useState } from "react";
import { CustomFormType, FormContent } from "@/types";
import { usePostEventsImageMutation, useRemoveEventsImageMutation } from "@/lib/api/eventsApiSlice";
import { useLocale } from "next-intl";
import dayjs from "dayjs";

interface EventsFormType extends CustomFormType{
    eventsdata: FormContent;
    setEventsData: (value: any) => void;
}

const EventsForm: React.FC<EventsFormType> = 
    ({ form, eventsdata, setEventsData }) => {
    const locale = useLocale();
    const [postEventsImage, {}] = usePostEventsImageMutation()
    const [removeEventsImage, {}] = useRemoveEventsImageMutation()
    useEffect(() => {
        if(eventsdata){
            form.setFieldsValue({
                slug: eventsdata.slug,
                visible: eventsdata?.visible,
                // tags: eventsdata?.tags,
                type: eventsdata?.type,
                datetime: eventsdata?.datetime ? dayjs(eventsdata.datetime) : null
            })
        }
    }, [eventsdata])

    const handleType = (e: any) => {
        setEventsData((prev: any) => {
            return {
                ...prev,
                type: e.target.value
            }
        })
    }

    const handleDate = (e: any) => {
        setEventsData((prev: any) => {
            return {
                ...prev,
                datetime: e.toISOString()
            }
        })
    }

    console.log("image data from Events form", eventsdata.images)

    return(
        <Form
            className=" w-full h-full "
            form={form}
            layout="vertical"
        >
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={eventsdata} setData={setEventsData} locale={"en"} form={form} />
                <TitleContent data={eventsdata} setData={setEventsData} locale={"tr"} form={form} />
            </div>
            <Form.Item 
                required
                name={"slug"}
                label={<I18N>SLUG</I18N>}>
                <Input
                    onChange={(e) => {
                        setEventsData((prev: any) => {
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
                name={`type`}
                label={<I18N>EVENT_TYPE</I18N>}
            >
                <Input className="inputStyle" value={eventsdata?.type} onChange={handleType} placeholder={`${"Buraya yazın"}`} />
            </Form.Item>
            <Form.Item
                required
                name={`datetime`}
                label={<I18N>DATE</I18N>}
            >
                <DatePicker showTime onChange={handleDate} />
            </Form.Item>
            <Form.Item 
                required
                name={"images"}
                label={<I18N>IMAGES</I18N>}
            >
                <ImageUpload setData={setEventsData} fileList={eventsdata.images} multiple={false} removeImageApi={removeEventsImage} postImageApi={postEventsImage}  />
            </Form.Item>
        </Form>

    )
}

export default EventsForm