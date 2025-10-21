import React from 'react';

export const Login = () => {
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

        <form className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="sr-only">Login details</legend>
            
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

          <button
            type="button"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In →
          </button>
        </form>

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
