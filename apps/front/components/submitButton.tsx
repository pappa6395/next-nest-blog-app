"use client"

import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { useFormStatus } from 'react-dom'
import { VariantProps } from 'class-variance-authority'

    

const SubmitButton = ({children, ...props}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  } ) => {

    const { pending } = useFormStatus();

  return (

    <Button type="submit" aria-disabled={pending} {...props}>
        {pending ? <span className='animate-pulse'>Submitting</span> : children}
    </Button>

  )
}

export default SubmitButton