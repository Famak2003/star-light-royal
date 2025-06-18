import { FormContent, SubPageType } from "@/types";
import TitleContent from "./TitleContent";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSub_Pages } from "@/lib/slices/pagesSlice";
import { FormInstance } from "antd";

export interface SubForm {
    index: number;
    form: FormInstance
}

const Writeup:React.FC<SubForm> = ({index, form}) => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.pages.sub_pages)
    console.log(data)
    const [writeupData, setWriteupData] = useState<FormContent>(
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

    useEffect(() => { 
        setWriteupData(data?.[index] || { // populates the local state with the actual data on page load
            title: { en: "", tr: "" },
            content: { en: "", tr: "" },
        })
    }, [])

    useEffect(() => {
        const newData = data // clone data
        newData[index] = writeupData // Replace writeup state with its placeholder in the initial data source
        dispatch(setSub_Pages(newData))
        // setData(() => {
        //     const newData = data // clone data
        //     newData[index] = writeupData // Replace writeup state with its placeholder in the initial data source
        //     return newData
        // })
    }, [writeupData])

    // console.log(writeupData)
    

    return(
        <>
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={writeupData} setData={setWriteupData} locale={"en"} form={form} />
                <TitleContent data={writeupData} setData={setWriteupData} locale={"tr"} form={form} />
            </div>
        </>
    )
}

export default Writeup;