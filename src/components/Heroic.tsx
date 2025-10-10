import React from 'react'
import { BiLinkExternal, BiUpArrowAlt } from 'react-icons/bi'
import { cn } from '@/lib/utils'

export default function Heroic() {
  return (
    <div className="w-full  flex flex-col justify-center items-center px-6 py-16 text-center text-foreground font-sans">
      {/* Label */}
      <span className={cn(
        "bg-secondary text-secondary-foreground",
        "rounded px-3 py-2 cursor-pointer",
        "transition-all duration-75 ease-in-out",
        "shadow-xs hover:shadow-none "
      )}>
        Share and Grow <BiUpArrowAlt size={20} className=" inline-block" />
      </span>

      {/* Heading */}
      <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-foreground/90 tracking-tight leading-tight">
        Explore What happening in World!
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-sm sm:text-sm text-muted-foreground max-w-xl">
        Build, connect, and grow with tools designed for modern creators and teams.
      </p>

      {/* Optional CTA Button */}
      <button className="mt-8 px-6 py-3 rounded text-primary-foreground cursor-pointer shadow-xs hover:shadow-none bg-primary hover:bg-primary/90 transition">
        Publish Your First Blog<BiLinkExternal className='inline ml-1' />
      </button>
      
          </div>
  )
}
