"use client"

import { Button, Divider, Form, Input, InputRef, Select, Space } from "antd"
import I18N from "@/i18n"
import ImageUpload from "./ImageUpload"
import { FormContent, SubPageType } from "@/types"
import { usePostPageImageMutation, useRemovePageImageMutation } from "@/lib/api/pagesApiSlice"
import { PlusOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"


const GridLayout:React.FC<SubPageType> = ({data, setData, index, form}) => {
    const inputRef = useRef<InputRef>(null);
    const [name, setName] = useState('');
    const [gridData, setGridData] = useState<FormContent>(
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

    let nameIndex = 0;
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | any>) => {
        e.preventDefault();
        setGridData((prev: any) => {
            return {
                ...prev,
                tags: [...(prev?.tags || []), name || `New item ${nameIndex++}`]
            }
        })
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>, locale: string) => {
        const newValue = e.target.value;
        setGridData((prev: any) => ({
            ...prev,
            title: {
                ...prev.title,
                [locale]: newValue,
            },
        }));
    }

    console.log(data)
    console.log(index)
    console.log(gridData)

    useEffect(() => {
        form.setFieldsValue({
            [`titleEN${index}`]: gridData.title.en,
            [`titleTR${index}`]: gridData.title.tr,
            // [`link${index}`]: gridData.link,
            [`tags${index}`]: gridData.tags,
        })
    }, [form, index])
    
    useEffect(() => {
        console.log("Individual data",data[index])
        setGridData(data?.[index] || { // populates the local state with the actual data on page load
            title: { en: "", tr: "" },
            caption: "",
            slug: "",
        })
    }, [])

    useEffect(() => {
        console.log("If interior data changes")
        setData((prev:any) => {
            const newData = [...prev]
            newData[index] = gridData
            return newData
        })
    }, [gridData])

    return(
        <>
            <div className=" flex flex-col md:flex-row justify-between items-start w-full h-fit gap-3 " >
                <div className=" flex flex-col w-full" >
                    <h1 className=" text16 p-3 rounded-md bg-gray-300 md:bg-transparent italic uppercase" >EN</h1>
                    <Form.Item
                        required
                        name={`titleEN${index}`}
                        label={ "Page Title" }
                        className=" w-full"
                    >
                        <Input className=" w-full inputStyle" value={gridData?.title.en} onChange={(e) => handleTitle(e, 'en')} placeholder={`Input Title here`} />
                    </Form.Item>
                </div>
                <div className=" flex flex-col w-full " >
                    <h1 className=" text16 p-3 rounded-md bg-gray-300 md:bg-transparent italic uppercase" >TR</h1>
                    <Form.Item
                        required
                        name={`titleTR${index}`}
                        label={ "Sayfa Başlığı" }
                        className=" w-full"
                    >
                        <Input className=" w-full inputStyle" value={gridData?.title?.tr} onChange={(e) => handleTitle(e, 'tr')} placeholder={"Başlığı buraya girin"} />
                    </Form.Item>
                </div>
            </div>
            {/* <Form.Item 
                required
                name={`link${index}`}
                label={<I18N>LINK</I18N>}>
                <Input
                    onChange={(e) => {
                        setGridData((prev: any) => {
                            return { 
                                ...prev,
                                link: e.target.value
                            }
                        })
                    } }
                    value={gridData?.link}
                    className="inputStyle"
                    placeholder={"İçerik Link"}
                />
            </Form.Item> */}
            <Form.Item 
                required
                name={`tags${index}`}
                label={<I18N>TAGS</I18N>}>
                <Select
                    mode="multiple"
                    onChange={(value) => {
                        console.log(value)
                        setGridData((prev: any) => {
                            return {
                                ...prev,
                                tags: value
                            }
                        })
                    } } 
                    className="inputStyle"
                    placeholder={"İçerik tag"}
                    dropdownRender={(menu) => (
                        <div className=" bg-dark_yellow rounded-md">
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                                placeholder="Lütfen etiketi girin"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={(e) => name ? addItem(e) : ""}>
                                Add item
                            </Button>
                            </Space>
                        </div>
                        )}
                    options={gridData?.tags?.map((item) => ({ lablel: item, value: item }))}
                />
            </Form.Item>
            <Form.Item 
                required
                name={`images${index}`}
                label={<I18N>IMAGES</I18N>}
            >
                <ImageUpload setData={setGridData} fileList={gridData?.images} multiple={false} removeImageApi={removePageImage} postImageApi={postPageImage}  />
            </Form.Item>
        </>
    )
}

export default GridLayout