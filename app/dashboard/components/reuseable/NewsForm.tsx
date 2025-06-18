'use client'

import I18N from "@/i18n"
import { Button, Divider, Form, Input, InputRef, Select, Space, Switch } from "antd"
import TitleContent from "./TitleContent";
import ImageUpload from "./ImageUpload";
import { useEffect, useRef, useState } from "react";
import { CustomFormType, FormContent } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { usePostNewsImageMutation, useRemoveNewsImageMutation } from "@/lib/api/newsApiSlice";

interface NewsFormType extends CustomFormType{
    newsdata: FormContent;
    setNewsData: (value: any) => void;
}

const NewsForm: React.FC<NewsFormType> = 
    ({ form, newsdata, setNewsData }) => {
        const [postNewsImage, {}] = usePostNewsImageMutation()
        const [removeNewsImage, {}] = useRemoveNewsImageMutation()
        const inputRef = useRef<InputRef>(null);
        const [name, setName] = useState('');
        let index = 0;

        useEffect(() => {
            if(newsdata){
                form.setFieldsValue({
                    slug: newsdata.slug,
                    visible: newsdata?.visible,
                    tags: newsdata?.tags
                })
            }
        }, [newsdata])


    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | any>) => {
        e.preventDefault();
        setNewsData((prev: any) => {
            return {
                ...prev,
                tags: [...(prev?.tags || []), name ]
            }
        })
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return(
        <Form
            className=" w-full h-full "
            form={form}
            layout="vertical"
        >
            <div className=" flex flex-col md:flex-row justify-between items-start gap-3 " >
                <TitleContent data={newsdata} setData={setNewsData} locale={"en"} form={form} />
                <TitleContent data={newsdata} setData={setNewsData} locale={"tr"} form={form} />
            </div>
            <Form.Item 
                required
                name={"tags"}
                label={<I18N>TAGS</I18N>}>
                <Select
                    mode="multiple"
                    onChange={(value) => {
                        console.log(value)
                        setNewsData((prev: any) => {
                            return {
                                ...prev,
                                tags: value
                            }
                        })
                    } } 
                    className="inputStyle"
                    placeholder={"İçerik tag"}
                    dropdownRender={(menu) => (
                        <>
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
                        </>
                      )}
                    options={newsdata.tags?.map((item) => ({ lablel: item, value: item }))}
                />
            </Form.Item>
            <Form.Item 
                required
                name={"slug"}
                label={<I18N>SLUG</I18N>}>
                <Input
                    onChange={(e) => {
                        setNewsData((prev: any) => {
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
                        setNewsData((prev: any) => {
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
                <ImageUpload setData={setNewsData} fileList={newsdata.images} removeImageApi={removeNewsImage} postImageApi={postNewsImage}  />
            </Form.Item>
        </Form>

    )
}

export default NewsForm