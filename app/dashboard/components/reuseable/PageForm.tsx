import { Form, Input, Switch } from "antd"
import TitleContent from "./TitleContent"
import I18N from "@/i18n"
import { CustomFormType, FormContent, PageFormType, PagesDataType } from "@/types";
import React from "react";
// import { PagesDataType } from "@/lib/slices/pagesSlice";
// interface PageFormType extends CustomFormType{
//     pagedata: PagesDataType;
//     setPageData: (value: any) => void;
// }

const PageForm: React.FC<PageFormType> = ({ form, pagedata, setPageData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, locale: string) => {
        const newValue = e.target.value;
        setPageData((prev: any) => ({
            ...prev,
            title: {
                ...prev.title,
                [locale]: newValue,
            },
        }));
    };

    return(
        <Form
            className=" w-full h-full "
            form={form}
            layout="vertical"
        >
            {/* : */}
            <div className=" flex flex-col md:flex-row justify-between items-start w-full h-fit gap-3 " >
                <Form.Item
                    required
                    name={`titleEN`}
                    label={ "Title" }
                    className=" w-full md:w-1/2"
                >
                    <Input className=" w-full inputStyle" value={pagedata.title?.en} onChange={(e) => handleChange(e, 'en')} placeholder={`"Input Title here" }`} />
                </Form.Item>
                <Form.Item
                    required
                    name={`titleTR`}
                    label={ "Başlık" }
                    className=" w-full md:w-1/2"
                >
                    <Input className=" w-full inputStyle" value={pagedata.title?.tr} onChange={(e) => handleChange(e, 'tr')} placeholder={"Başlığı buraya girin"} />
                </Form.Item>
                {/* <TitleContent data={pagedata} setData={setPageData} locale={"en"} form={form} justTitle={true}/>
                <TitleContent data={pagedata} setData={setPageData} locale={"tr"} form={form} justTitle={true}/> */}
            </div>
            <Form.Item
                required
                name={"visible"}
                label={<I18N>VISIBLE</I18N>}
            >
                <Switch
                    className=" scale-75 "
                    value={true}
                    onChange={(value) => {
                        setPageData((prev: any) => {
                            return{
                                ...prev,
                                visible: value
                            }
                        })
                    }}
                />
            </Form.Item>
        </Form>

    )
}

export default PageForm;