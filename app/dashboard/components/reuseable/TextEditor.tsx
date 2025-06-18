"use client"

import I18N from '@/i18n';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface TextEditorType {
    defaultContent?: string;
    allowRichTextImage?: boolean;
    handleContent?: (value: string) => void;
    placeHolder: string;
    content: string;
    language: string;
    setContent?: (value: string) => void;
    setData: (value: any) => void;
}

const TextEditor: React.FC<TextEditorType> = ({language, placeHolder, content, setData}) =>{
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);

    const handleRchTextChange = (hotChange: string) => {
        setData((prev:  any) => {
            return {
                ...prev,
                content: {
                    ...prev.content,
                    [language]: hotChange
                }
            }
        })
        // setContent(hotChange)
    }

    const modules = {
        toolbar: [
            [{'header': [1,2,3,4,5,6,false]}],
            [{'size': []}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'},   {'indent': '+1'}],
            [{ 'color': [] }], 
            [['image', 'link']], // Conditionally include image and link
            ['clean'],
        ],
        
    }

    return(
        <div className=' h-[300px] w-full'>
            <ReactQuill
                className=' w-full pb-[70px] tab:pb-[70px]  '
                theme='snow'
                placeholder={placeHolder}
                value={content}
                onChange={handleRchTextChange}
                modules={modules}
                style={{ height: "100%" }} 
            />
        </div>
    )
}
export default TextEditor