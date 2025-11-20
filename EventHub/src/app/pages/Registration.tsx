'use client';
import React, { useActionState, useState } from 'react';
import { register } from "@/app/api/auth/authServerActions";
import { useFormStatus } from "react-dom";
import { set } from 'zod';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

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
   const [open, setOpen] = useState(true);
 const [modalError, setModalError] = useState<string | null>(null);
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await register(prevState, formData);
      console.log('Registration result:', result);
      if (result.success) {
        window.location.href = "/";
      }else{
        setModalError(result.error);
        setOpen(true);
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
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <header className="text-center">
          <p className="text-sm text-gray-600">Join our community and discover amazing events</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Create your Account
          </h1>
        </header>

        {/*Google og facebook, som må gjøres noe med */}

        <section className="space-y-4">
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
        </section>

        <section className="relative my-6">
          <span className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-gray-300" />
          </span>
          <p className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
          </p>
        </section>

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
               {modalError && !state.success && "error" in state && state.error && (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    {state.error}
                  </DialogTitle>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Lukk
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </a>
        </p>
      </section>
    </main>
  );
};
