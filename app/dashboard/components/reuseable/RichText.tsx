'use client'

import { useEditor, EditorContent, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, } from '@tiptap/react'
import { FC } from 'react'

// import { Color } from '@tiptap/extension-color'


export const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
        <div className="button-group">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleStrike()
                    .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>        
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                H4
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
                H5
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
                H6
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                Ordered list
            </button>        
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                Blockquote
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                Horizontal rule
            </button>
            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                Hard break
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .undo()
                    .run()
                }
            >
                Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .redo()
                    .run()
                }
            >
                Redo
            </button>        
        </div>
    </div>
  )
}

const extensions = [
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

type RichTextdata = {
    setData: (vale:any) => void;
    content?: string;
}

const RichText: FC<RichTextdata> = ({setData, content="<p>Hello World! 🌎️</p>"}) => {

    return(
        <div className=' flex flex-col gap-3 ring-1 rounded-xl ring-secondary_light_grey p-1 '>
            <EditorProvider
                editorContainerProps={{
                    className: 'h-96 overflow-auto border p-2 ring-1 ring-secondary_light_grey rounded-lg',
                    style: { maxHeight: '24rem' },
                }}  
                onUpdate={({ editor }) => {
                    const html = editor.getHTML();
                    setData((prev: any) => {
                        return {
                            ...prev,
                            content: html
                        }
                    })
                }} 
                slotBefore={<MenuBar />} 
                extensions={extensions} 
                content={content}
            ></EditorProvider>
        </div>
    )
}

export default RichText
