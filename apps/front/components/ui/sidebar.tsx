"use client"
import { cn } from '@/lib/utils';
import React, { PropsWithChildren, ReactNode, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts';

type Props = PropsWithChildren<{
    triggerIcon: ReactNode;
    triggerClassName?: string;
}>;

const Sidebar = (props: Props) => {

    const [show, setShow] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref as unknown as RefObject<HTMLDivElement>, () => setShow(false));
    

  return (
    <>
        <button 
            onClick={() => setShow((prev) => !prev)} 
            className={props.triggerClassName}
        >
            {props.triggerIcon}
        </button>
        <div 
            ref={ref}
            className={cn('w-60 absolute top-0 z-30 transition-all bg-white rounded-r-md min-h-screen', {
            '-left-full': !show,
            'left-0': show,
        })}>
            {props.children}
        </div>
    </>
  )
}

export default Sidebar