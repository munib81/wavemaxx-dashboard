export default function Earnings({ userDetails }) {
  return (
    <div className="pt-4 pb-4 md:px-4">
      <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
        WaveMaxx
        <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-500 ml-2">
          Earnings
        </mark>
      </h1>
      <p className=" text-gray-500 dark:text-gray-400 ">
        Find receipts of all the payments done on the platform.
      </p>
      {/* <div className="mt-4">
        <div className="max-w-4xl p-4 text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
          <div className="">
            <div className="grid ">
              <h3 className="text-2xl font-semibold">Silent Voice</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                ayushvidhale/silentVoice
              </p>
            </div>
            <div className="-mt-14 flex justify-end items-baseline">
              <span className="mr-2 md:text-4xl text-2xl font-extrabold">
                ₹1,750
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                /all-time
              </span>
            </div>
          </div>
          <ul role="list" className="md:my-4 my-8 space-y-2 text-left">
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>₹500 - Individual configuration</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>₹1000 - No setup, or hidden fees</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                ₹500 - Premium support:{" "}
                <span className="font-semibold">36 months</span>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                ₹500 - Free updates:{" "}
                <span className="font-semibold">36 months</span>
              </span>
            </li>
          </ul>
          <a
            href="#"
            className="text-white bg-navbar border border-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-gray-900"
          >
            Print Out
          </a>
        </div>
      </div> */}

      {/* <div className="max-w-4xl mt-4 p-4 text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
        <div className="">
          <div className="grid ">
            <h3 className="text-2xl font-semibold">WaveMaxx Platform</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              payments made for premium platform experience
            </p>
          </div>
          <div className="-mt-14 flex justify-end items-baseline">
            <span className="mr-2 md:text-4xl text-2xl font-extrabold">
              -₹749
            </span>
            <span className="text-gray-500 dark:text-gray-400">/all-time</span>
          </div>
        </div>
              </div>

              <div className="max-w-4xl mt-4 p-4 text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
        <div className="">
          <div className="grid ">
            <h3 className="text-2xl font-semibold">WaveMaxx Platform</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              payments made for premium platform experience
            </p>
          </div>
          <div className="-mt-14 flex justify-end items-baseline">
            <span className="mr-2 md:text-4xl text-2xl font-extrabold">
              -₹749
            </span>
            <span className="text-gray-500 dark:text-gray-400">/all-time</span>
          </div>
        </div>
              </div> */}

      <div className="max-w-4xl mt-4 p-4 text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
        <div className="">
          <div className="grid ">
            <h3 className="text-xl font-semibold">2 Months Premium (Free)</h3>
            <p className="font-light text-sm pb-2 text-gray-500 dark:text-gray-400">
              payments made for premium platform experience
            </p>
          </div>
          <div className="-mt-14 flex justify-end items-baseline">
            <span className="mr-2 md:text-4xl text-2xl font-extrabold">
              -₹200
            </span>
            <span className="text-gray-500 dark:text-gray-400">/2-months</span>
          </div>
        </div>
      </div>
    </div>
  );
}
