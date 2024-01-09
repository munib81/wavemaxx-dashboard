export default function Notifications({ userDetails }) {
  return (
    <div className="pt-4 pb-4 md:px-4">
      <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
        WaveMaxx
        <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-500 ml-2">
          Notifications
        </mark>
      </h1>
      <p className=" text-gray-500 dark:text-gray-400 ">
        Manage your device notifications, updates and Profile notifications from
        here.
      </p>
      <div className="mt-4">
        <div className="max-w-4xl p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
          <div className="">
            <div className="grid ">
              <h3 className="text-2xl font-semibold">Device</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                turn on/off device notifications
              </p>
            </div>
            <div className="-mt-14 pb-6 md:pb-2 flex justify-end items-baseline">
              <span className="mr-2 md:text-5xl text-2xl font-extrabold">
                ₹2,500
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                /all-time
              </span>
            </div>
          </div>
          {/* <ul role="list" className="md:my-4 my-8 space-y-2 text-left">
                     <li className="flex items-center space-x-3">
                         
                         <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                         <span>₹500 - Individual configuration</span>
                     </li>
                     <li className="flex items-center space-x-3">
                         
                         <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                         <span>₹1000 - No setup, or hidden fees</span>
                     </li>
                     <li className="flex items-center space-x-3">
                         
                         <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                         <span>₹500 - Premium support: <span className="font-semibold">36 months</span></span>
                     </li>
                     <li className="flex items-center space-x-3">
                         
                         <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                         <span>₹500 - Free updates: <span className="font-semibold">36 months</span></span>
                     </li>
                 </ul> */}
          {/* <a href="#" className="my-8 text-white bg-navbar border border-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-gray-300">Print Out</a> */}
        </div>
        <div className="max-w-4xl mt-4 p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
          <div className="">
            <div className="grid ">
              <h3 className="text-2xl font-semibold">Club</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Manage Profile update notifications
              </p>
            </div>
            {/* <div className="-mt-14 flex justify-end items-baseline">
                     <span className="mr-2 md:text-5xl text-2xl font-extrabold">Secured</span>
                     <span className="text-gray-500 dark:text-gray-400">/private</span>
                 </div> */}
          </div>
          <div className="my-4 grid grid-cols-2 gap-4">
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-11"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-11"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Job offers
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                defaultchecked
                id="bordered-checkbox-21"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-21"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Checked state
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-31"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-31"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default radio
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-41"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-41"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default radio
              </label>
            </div>
          </div>

          {/* <a href="#" className="my-8 text-white bg-navbar border border-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-gray-300">Print Out</a> */}
        </div>

        <div className="max-w-4xl mt-4 p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
          <div className="">
            <div className="grid ">
              <h3 className="text-2xl font-semibold">Global</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Manage what to see in your feed
              </p>
            </div>
            {/* <div className="-mt-14 flex justify-end items-baseline">
                     <span className="mr-2 md:text-5xl text-2xl font-extrabold">Secured</span>
                     <span className="text-gray-500 dark:text-gray-400">/private</span>
                 </div> */}
          </div>
          <div className="my-4 grid grid-cols-2 gap-4">
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-12"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-12"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Job offers
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                defaultchecked
                id="bordered-checkbox-22"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-22"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Checked state
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-32"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-32"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default radio
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-checkbox-42"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-42"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default radio
              </label>
            </div>
          </div>

          {/* <a href="#" className="my-8 text-white bg-navbar border border-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-gray-300">Print Out</a> */}
        </div>
      </div>
    </div>
  );
}
