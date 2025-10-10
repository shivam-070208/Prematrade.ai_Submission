'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SignupForm {
  firstName: string
  lastName: string
  email: string
  password: string
  username:string
}

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>()

  const onSubmit = async (data: SignupForm) => {
    try {
        console.log(data);
        
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      console.log(response);
      
      if (response.ok) {
        router.back();
      } else {
        const error = await response.json()
        setError(error.message);
      }
    } catch (err) {
        
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        
        {error && (
          <div className="bg-destructive/20 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className="w-full p-2 rounded-md border bg-background"
              />
              {errors.firstName && (
                <span className="text-primary text-sm">*{errors.firstName.message}</span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className="w-full p-2 rounded-md border bg-background"
              />
              {errors.lastName && (
                <span className="text-primary text-sm">*{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              {...register('username', {
                required: 'username is required',
              })}
              className="w-full p-2 rounded-md border bg-background"
            />
            {errors.email && (
              <span className="text-primary text-sm">*{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-2 rounded-md border bg-background"
            />
            {errors.email && (
              <span className="text-primary text-sm">*{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full p-2 rounded-md border bg-background"
            />
            {errors.password && (
              <span className="text-primary text-sm">*{errors.password.message}</span>
            )}
          </div>
            {error&&<p className='text-primary text-sm'>{error}</p>}
          <button
            type="submit"
            className="w-full btn-brutual"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
