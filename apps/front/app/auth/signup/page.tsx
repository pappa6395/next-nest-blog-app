import React from 'react'
import SignUpForm from './_components/signupForm'
import Link from 'next/link'




const SignUpPage = () => {

  return (

    <div className='bg0white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center'>
        <h2 className='text-center text-2xl font-bold mb-4'>
            Sign Up Page
        </h2>
        <SignUpForm />
        <div>
          <p>Already have an account?</p>
          <Link className="underline" href={"/auth/signin"}>
            Sign In
          </Link>
        </div>
    </div>

  )
}

export default SignUpPage