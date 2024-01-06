export default function NotFound() {
  return (
    <div className=" py-6  sm:py-8 lg:py-12 mt-28 overflow-hidden">
      <div className="mx-auto my-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* <!-- content - start --> */}
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p className="mb-4 text-6xl font-semibold uppercase text-indigo-500 md:text-base">
              404
            </p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-100 sm:text-left md:text-3xl">
              Page not found
            </h1>

            <p className="mb-8 text-center text-gray-400 sm:text-left md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <a
              href="/"
              className="inline-block rounded-lg bg-gray-400 px-8 p-3 text-center text-sm font-semibold text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-900 focus-visible:ring active:text-gray-700 md:text-base"
            >
              Go home
            </a>
          </div>
          {/* <!-- content - end --> */}

          {/* <!-- image - start --> */}
          <div className="relative h-80 overflow-hidden rounded-lg  shadow-lg md:h-auto">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2313664207/display_1500/stock-vector-cute-kitten-with-blue-eyes-with-her-blue-scarf-2313664207.jpg"
              loading="lazy"
              alt="Photo by @heydevn"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          {/* <!-- image - end --> */}
        </div>
      </div>
    </div>
  );
}
