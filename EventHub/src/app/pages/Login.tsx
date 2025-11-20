"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { login } from "@/app/api/auth/authServerActions";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {pending ? "Logger inn..." : "Logg inn"}
    </button>
  );
}

export const Login = () => {
  const [open, setOpen] = useState(true)
  const [modalError, setModalError] = useState<string | null>(null);
  const [state, formAction] = useActionState(
    // Uses any for simplicity here
    async (prevState: any, formData: FormData) => {
      const result = await login(prevState, formData);
      console.log(result);

      if (result.success) {
        window.location.href = "/";
      } else {
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </header>

        <section className="space-y-4">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="ml-2">Continue with Google</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="ml-2">Continue with Facebook</span>
          </button>
        </section>

        <section className="relative my-6">
          <span className="absolute inset-0 flex items-center" aria-hidden="true">
            <p className="w-full border-t border-gray-300" />
          </span>
          <p className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
          </p>
        </section>

        <form action={formAction} className="space-y-4">
          <fieldset className="space-y-4">
            <legend className="sr-only">Login details</legend>

            <p>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="username"
                name="email"
                type="text"
                autoComplete="email"
                required
                placeholder="Email"
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
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </p>
          </fieldset>

          <footer className="flex items-center justify-between">
            <p className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember Me
              </label>
            </p>

            <p className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot Password?
              </a>
            </p>
          </footer>

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
          Don't have an account?{' '}
          <a href="/registrering" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up for free.
          </a>
        </p>
      </section>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        <a href="#" className="hover:underline px-2">Privacy policy</a>
        <a href="#" className="hover:underline px-2">Term of Service</a>
        <a href="#" className="hover:underline px-2">Help</a>
      </footer>
    </main>
  );
};
