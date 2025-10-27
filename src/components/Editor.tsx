'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {MenuBar} from './index'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit , TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,],
    immediatelyRender: false,
    editorProps:{
      
      attributes:{
        class:"rounded outline-none min-h-80 border border-muted/90 transition-all px-3 py-2 focus:border-3 focus:border-muted"
      }
    }
  })

  return<>
  <MenuBar editor={editor} />
   <EditorContent editor={editor} />
  </>
}

export default Editor;