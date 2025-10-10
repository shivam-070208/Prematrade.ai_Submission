import { cn } from '@/lib/utils'
import React from 'react'

export default function Container({children,className=""}:{
    children:React.ReactNode,
    className?:string
}) {
  return (
    <div className='w-full max-w-5xl bg-foreground/10 px-1 relative mx-auto '>
        <div className={cn('w-full px-2 bg-background',className)}>
      {children}
        </div>
    </div>
  )
}
