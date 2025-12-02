
export const ContactUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-6">
      <section className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <section>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-800 mb-6">
            Fill out the form below to get in touch.
          </p>
        </section>

        <form className="space-y-4">
          <fieldset>
            <label className="block text-gray-800 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-800 rounded bg-white text-gray-800"
            />
          </fieldset>

          <fieldset>
            <label className="block text-gray-800 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-800 rounded bg-white text-gray-800"
            />
          </fieldset>

          <fieldset>
            <label className="block text-gray-800 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-800 rounded bg-white text-gray-800 resize-none"
            ></textarea>
          </fieldset>

          <button
            type="submit"
            className=" cursor-pointer w-full py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-black transition"
          >
            Send
          </button>
        </form>
      </section>
    </section>
  );
};