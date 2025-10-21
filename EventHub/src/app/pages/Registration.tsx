import React from 'react';

export const Registration = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <header className="text-center">
          <p className="text-sm text-gray-600">Join our community and discover amazing events</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Create your Account
          </h1>
        </header>

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
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
          </div>
        </section>

        <form className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="sr-only">Registration details</legend>

            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>
          </fieldset>

          <fieldset className="space-y-3">
             <legend className="sr-only">Agreements</legend>
             <div className="flex items-start">
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
             </div>
             <div className="flex items-start">
               <input
                 id="updates"
                 name="updates"
                 type="checkbox"
                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
               />
               <label htmlFor="updates" className="ml-2 block text-sm text-gray-900">
                 Send me updates about new events and features (optional)
               </label>
             </div>
          </fieldset>

          <button
            type="button"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create account →
          </button>
        </form>

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
