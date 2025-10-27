import { Editor } from '@tiptap/react'
import { ToggleButton } from './ui/ToggleButton'
  import { AlignCenterIcon, AlignJustifyIcon, AlignLeft, AlignLeftIcon, AlignRightIcon, Bold, BoldIcon, Heading1, Heading2, Heading3, Highlighter, Italic, Strikethrough } from 'lucide-react'
import { BiParagraph } from 'react-icons/bi'

const MenuBar = ({ editor}:{editor:Editor|null}) => {
  if (!editor) {
    return null
  }
const MenuItems = [
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor.isActive('heading', { level: 1 }),
    label: <Heading1 size={19} />
  },
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor.isActive('heading', { level: 2 }),
    label: <Heading2 size={19} />
  },
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor.isActive('heading', { level: 3 }),
    label: <Heading3 size={19} />
  },
  {
    onClick: () => editor.chain().focus().setParagraph().run(),
    isActive: editor.isActive('paragraph'),
    label: <BiParagraph size={19} />
  },

  {
   
    onClick: () => editor.chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold'),
    label: <Bold size={19} />
  },
  {
    onClick: () => editor.chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic'),
    label:  <Italic size={19} />,
  },
  {
    onClick: () => editor.chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike'),
    label: <Strikethrough size={19} />
  },
  {
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    isActive: editor.isActive('highlight'),
    label: <Highlighter size={19} />
  },
  {
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: editor.isActive({ textAlign: 'left' }),
    label: <AlignLeftIcon size={19} />
  },
  {
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: editor.isActive({ textAlign: 'center' }),
    label: <AlignCenterIcon size={19} />
  },
  {
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: editor.isActive({ textAlign: 'right' }),
    label: <AlignRightIcon size={19} />
  },
  {
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: editor.isActive({ textAlign: 'justify' }),
    label: <AlignJustifyIcon size={19} />
  }
]
  return (
    
      <div className="w-full space-x-2">
        {MenuItems.map((item, index) => (
          <ToggleButton key={index} {...item} >
            {item.label}
          </ToggleButton>
        ))}
      </div>

  )
}
export default MenuBar;