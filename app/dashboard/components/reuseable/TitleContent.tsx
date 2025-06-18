
import { Form, FormInstance, Input } from "antd"
import TextEditor from "./TextEditor"
import React, { useEffect, useState } from "react";
import { LocaleType } from "../../projects/page";
import { FormContent } from "@/types";

interface TitleContentType {
    locale: string;
    data: FormContent;
    setData: (value: any) => void;
    form: FormInstance;
    justTitle?: boolean
}

const TitleContent: React.FC<TitleContentType> = ({data, setData, locale, form, justTitle=false}) => {


    // console.log(data?.title?.[locale as keyof LocaleType])

    useEffect(() => {
        const title = data?.title?.[locale as keyof LocaleType]
        form.setFieldsValue({
           [`title${locale}`]: title,
        })
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setData((prev: any) => ({
            ...prev,
            title: {
                ...prev.title,
                [locale]: newValue,
            },
        }));
    };

    return(
        <div className="w-full">
            <h1 className=" text16 p-3 rounded-md bg-gray-300 md:bg-transparent italic uppercase" >{locale}</h1>
            <Form.Item
                required
                name={`title${locale}`}
                label={locale === "en" ? "Title" : "Başlık"}
            >
                <Input className="inputStyle" value={data.title?.[locale as keyof LocaleType]} onChange={handleChange} placeholder={`${ locale === "en" ?  "Input Title here" : "Başlığı buraya girin"}`} />
            </Form.Item>
            {
                !justTitle ?
                    <Form.Item
                        required
                        label={locale === "EN" ? "Content" : "İçerik"}
                        shouldUpdate={true} // Ensures it updates only when needed
                        initialValue={data?.content?.[locale as keyof LocaleType]}
                    >                        
                        <TextEditor placeHolder={`${ locale === "EN" ?  "Input Content here" : "İçeriği buraya girin"}`} content={data?.content?.[locale as keyof LocaleType]} setData={setData} language={locale} />
                    </Form.Item>
                    :
                    ""
            }
            {/* <Form.Item
                required
                label={locale === "EN" ? "Content" : "İçerik"}
                shouldUpdate={true} // Ensures it updates only when needed
                initialValue={data?.content?.[locale as keyof LocaleType]}
            >            
                <TextEditor placeHolder={`${ locale === "EN" ?  "Input Content here" : "İçeriği buraya girin"}`} content={data?.content?.[locale as keyof LocaleType]} setData={setData} language={locale} />
            </Form.Item> */}
        </div>
    )
}

export default TitleContent