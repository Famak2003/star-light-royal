"use client"

import { DatePicker, Form, Input } from "antd";
import TitleContent from "./TitleContent";
import { FormContent, SubForm, SubPageType } from "@/types";
import I18N from "@/i18n";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSub_Pages } from "@/lib/slices/pagesSlice";

const ManagementNote:React.FC<SubForm> = ({index, form}) => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.pages.sub_pages)
    console.log(data)
    const [managementData, setManagementData] = useState<FormContent>(
            {
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
        );

    const handleDate = (e: any) => {
        setManagementData((prev: any) => {
            return {
                ...prev,
                date: e.toISOString()
            }
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            [`caption${index}`]: managementData.caption,
            [`datetime${index}`]: managementData?.date ? dayjs(managementData.date) : null
        })
    }, [index, form])

    useEffect(() => {
        setManagementData(data?.[index] || { // populates the local state with the actual data on page load
          title: { en: "", tr: "" },
          content: { en: "", tr: "" },
          caption: "",
          date: "",
        });
    }, []);

    useEffect(() => {
        const newData = data // clone data
        newData[index] = managementData // Replace index
        dispatch(setSub_Pages(newData))
        // setData((prev:any) => {
        //     const newData = [...prev] // clone data
        //     newData[index] = managementData // Replace index
        //     return newData
        // })
    }, [managementData])

    return(
        <>
            <Form.Item
                required
                name={`caption${index}`}
                label={ <I18N>CAPTION</I18N> }
                className=" w-full md:w-1/2 "
            >
                <Input 
                    onChange={ (e) => {
                        setManagementData((prev:any) => {
                            return {
                                ...prev,
                                caption: e.target.value
                            }
                        }
                    )}} 
                    placeholder={`başlık girişi`}
                    className="inputStyle"
                />
                
            </Form.Item>
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={managementData} setData={setManagementData} locale={"en"} form={form} />
                <TitleContent data={managementData} setData={setManagementData} locale={"tr"} form={form} />
            </div>
            <Form.Item
                required
                name={`datetime${index}`}
                label={<I18N>DATE</I18N>}
            >
                <DatePicker onChange={handleDate} />
            </Form.Item>
        </>
    )
}

export default ManagementNote;