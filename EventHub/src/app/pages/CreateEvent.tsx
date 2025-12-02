'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createEventAction } from '@/app/api/events/eventsServerActions';
import { navigate } from 'rwsdk/client';
import type { ServerResult } from '@/app/types/result'; 

type CreateEventState = ServerResult<any, Record<string, any>>;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {pending ? 'Publishing...' : 'Publish Event'}
    </button>
  );
}

export const CreateEvent = () => {
  const [state, formAction] = useActionState<CreateEventState, FormData>(
  async (prevState, formData) => {
      const result = await createEventAction(prevState, formData) as CreateEventState;
      
      if (result.success) {
        navigate("/events"); 
      }
      return result; 
  },
  { success: false, error: "", state: {} }
);

  const getOldValue = (field: string) => {
    if (!state.success && state.state) {
        return state.state[field] as string;
    }
    return "";
};

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">
        Create an event
      </h1>

      {!state.success && state.error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-600">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-8">
        <article className="bg-white shadow sm:rounded-lg p-6">
          <header>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Basic Information
            </h2>
          </header>

          <section className="space-y-4">
            <section>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Event Title"
                required
                defaultValue={getOldValue('title')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </section>

            <section>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe your event..."
                required
                defaultValue={getOldValue('description')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </section>

            <section>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={getOldValue('category')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
              >
                <option value="" disabled>Select Category</option>
                <option value="music">Music</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
                <option value="social">Social</option>
              </select>
            </section>
          </section>
        </article>

        <fieldset className="bg-white shadow sm:rounded-lg p-6">
          <legend className="text-xl font-semibold mb-4 text-gray-800">Date & Time</legend>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                defaultValue={getOldValue('startDate')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </section>

            <section>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
                defaultValue={getOldValue('startTime')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </section>
          </section>
        </fieldset>

        <footer className="flex justify-end space-x-3">
          <button
            type="button"
            className="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Save Draft
          </button>
          
          <SubmitButton />
        </footer>
      </form>
    </section>
  );
};