'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {MenuBar} from './index'

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
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