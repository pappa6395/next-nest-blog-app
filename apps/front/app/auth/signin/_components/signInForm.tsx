"use client"

import SubmitButton from '@/components/submitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignIn } from '@/lib/actions/auth'
import React, { useActionState } from 'react'


const SignInForm = () => {

    const [state, action] = useActionState(SignIn, undefined)

  return (

    <div>
        <form action={action} className='flex flex-col gap-2'>
        {!!state?.message && <p className='text-red-500 text-sm'>{state.message}</p>}
            <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input 
                    id='email' 
                    name='email' 
                    type='email'
                    placeholder='john@example.com' 
                    defaultValue={state?.data?.email}
                />
            </div>
            {!!state?.errors?.email && (
                <p className='text-red-500 text-sm'>{state.errors.email}</p>
            )}
            <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input 
                    id='password' 
                    name='password'
                    type='password'
                    defaultValue={state?.data?.password} 
                />
            </div>
            {!!state?.errors?.password && (
                <div className='text-sm text-red-500'>
                    <p>Password Must</p>
                    <ul>
                        {state.errors.password.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
            <SubmitButton>Sign In</SubmitButton>
        </form>
    </div>

  )
}

export default SignInForm