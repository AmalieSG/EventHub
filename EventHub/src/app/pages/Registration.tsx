'use client';
import React, { useActionState, useState } from 'react';
import { register } from "@/app/api/auth/authServerActions";
import { useFormStatus } from "react-dom";

type ApiResponse = {
  message?: string;
  error?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
}

export const Registration = () => {

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await register(prevState, formData);
      console.log('Registration result:', result);
      if (result.success) {
        window.location.href = "/";
      }
      return result;
    },
    {
      success: false,
      error: "",
      state: {
        user: null,
        session: null,
      },
    }
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
     
      <article className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
      
        <div className="text-center">
          <p className="text-sm text-gray-600">Join our community and discover amazing events</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Create your Account
          </h1>
        </div>

        
        <aside className="space-y-4">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="ml-2">Sign up with Google</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="ml-2">Sign up with Facebook</span>
          </button>
        </aside>

        <div className="relative my-6">
          <span className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-gray-300" />
          </span>
          <p className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <fieldset className="space-y-4">
            <legend className="sr-only">Registration details</legend>

            <p>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Enter your first name"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>

            <p>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Enter your last name"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>

            <p>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>

            <p>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Enter your password"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>

            <p>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="sr-only">Agreements</legend>
            <p className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
              </label>
            </p>
            <p className="flex items-start">
              <input
                id="updates"
                name="updates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="updates" className="ml-2 block text-sm text-gray-900">
                Send me updates about new events and features (optional)
              </label>
            </p>
          </fieldset>

          <SubmitButton />

        </form>
        {!state.success && "error" in state && state.error && (
          <div className='px-5 py-5 rounded bg-red-600 text-white text-center'>
            {state.error}
          </div>
        )}


        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </a>
        </p>
      </article>
    </section>
  );
};