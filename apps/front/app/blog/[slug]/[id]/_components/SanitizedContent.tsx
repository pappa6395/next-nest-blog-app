"use client"

import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';


type Props = {
    content: string;
    className?: string;
}

const SanitizedContent = (props: Props) => {

    const { content } = props

    const [sanitizedContent, setSanitizedContent] = useState('');
   

    useEffect(() => {
        setSanitizedContent(DOMPurify.sanitize(content));
    }, [content]);

  return (
    <div 
     className={props.className}
     dangerouslySetInnerHTML={{__html: sanitizedContent}}
    />
  )
}

export default SanitizedContent