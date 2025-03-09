import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const PostLayout = ({children}: Props) => {

  return (
    <div className='max-w-screen-xl mt-24 mx-auto px-4 sm:px-6'>
        {children}
    </div>
  )
}

export default PostLayout