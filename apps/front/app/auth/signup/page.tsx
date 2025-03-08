import React from 'react'
import SignUpForm from './_components/signupForm'




const SignUpPage = () => {

  return (

    <div className='bg0white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center'>
        <h2 className='text-center text-2xl font-bold mb-4'>
            Sign Up Page
        </h2>
        <SignUpForm />
        <div>
            <p>Already have an account?</p>
        </div>
    </div>

  )
}

export default SignUpPage