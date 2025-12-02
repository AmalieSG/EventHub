'use client';

import React from 'react';

export const CreateEvent = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">
        Create an event
      </h1>

      <form className="space-y-8">
        <fieldset className="bg-white shadow sm:rounded-lg p-6 space-y-4">
          <legend className="text-xl font-semibold text-gray-800">
            Basic Information
          </legend>

          <p>
            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              id="event-title"
              placeholder="Enter Event Title"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </p>

          <p>
            <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
              Event Description
            </label>
            <textarea
              id="event-description"
              rows={4}
              placeholder="Describe your event, what attendees can expect, agenda etc."
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </p>

          <p>
            <label htmlFor="event-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="event-category"
              required
              defaultValue=""
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
            >
              <option value="" disabled>Select Category</option>
              <option value="music">Music</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="social">Social</option>
            </select>
          </p>
        </fieldset>

        <fieldset className="bg-white shadow sm:rounded-lg p-6">
          <legend className="text-xl font-semibold mb-4 text-gray-800">Date & Time</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </p>

            <p>
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="start-time"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </p>
          </div>
        </fieldset>

        <p className="flex justify-end space-x-3">
          <button
            type="button"
            className="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Publish Event
          </button>
        </p>
      </form>
    </section>
  );
};