import I18N from "@/i18n";
import { Form, FormInstance, Input } from "antd";
import TitleContent from "./TitleContent";
import { CustomFormType, FormContent, SubPageType } from "@/types";
import ImageUpload from "./ImageUpload";
import { usePostPageImageMutation, useRemovePageImageMutation } from "@/lib/api/pagesApiSlice";
import { useEffect, useState } from "react";

// interface OfficialMessageType extends CustomFormType {
//     data: FormContent;
//     setData: (vale:any) => void;
// }

const OfficialMessage:React.FC<SubPageType> = ({data, setData, index, form}) => {
    const [officialData, setOfficialData] = useState<FormContent>(
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

    const [postPageImage] = usePostPageImageMutation()
    const [removePageImage] = useRemovePageImageMutation()

    useEffect(() => {
        form.setFieldsValue({
            [`name${index}`]: officialData.name,
        })
    }, [index, form])

    useEffect(() => {
        setOfficialData(data?.[index] || { // populates the local state with the actual data on page load
            title: { en: "", tr: "" },
            content: { en: "", tr: "" },
            name: "",
            images: [],
          })
    }, [])

    useEffect(() => {
        setData((prev: any) => {
            const newData = [...prev] // clone data
            newData[index] = officialData // Replace index
            return newData
        })
    }, [officialData])

    console.log(officialData)

    return(
        <>
            <Form.Item
                required
                name={`name${index}`}
                label={ <I18N>NAME</I18N> }
                className=" w-full md:w-1/2 "
            >
                <Input 
                    onChange={ (e) => {
                        setOfficialData((prev:any) => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        }
                    )}} 
                    placeholder={`Adı buraya girin`}
                    className="inputStyle"
                />
                
            </Form.Item>
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={officialData} setData={setOfficialData} locale={"en"} form={form} />
                <TitleContent data={officialData} setData={setOfficialData} locale={"tr"} form={form} />
            </div>
            <Form.Item 
                required
                name={"images"}
                label={<I18N>IMAGES</I18N>}
            >
                <ImageUpload setData={setOfficialData} fileList={officialData.images} multiple={false} removeImageApi={removePageImage} postImageApi={postPageImage} />
            </Form.Item>
        </>
    )
}

export default OfficialMessage;