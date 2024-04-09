import { useState } from "react";

export default function Subscription({ userDetails }) {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [merchantId, setMerchantId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send payment data to the API route using fetch
    const response = await fetch("/api/payment/googlepay", {
      method: "POST",
      body: JSON.stringify({
        amount,
        upiId,
        merchantId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    //console.log(data);
  };

  // Note that you'll need to replace 'your-payment-gateway' with the name of your payment gateway, and provide the values for process.env.MONGODB_URI and process.env.GOOGLE_PAY_API_KEY in your .env file.

  return (
    <>
      {/* <section className="max-w-7xl px-4 pt-24 pb-12 mx-auto">
  <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
    <h1 className="block pb-2 mb-5 text-4xl font-extrabold leading-none tracking-normal text-transparent md:text-6xl md:tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
      Simple, transparent pricing.
    </h1>
    <p className="px-0 mb-10 text-lg text-gray-500 md:text-xl lg:px-24">Pricing that works for companies of any size.</p>
  </div>
  <div className="w-full mx-auto xl:w-4/5">
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
      <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div className="flex flex-col justify-between p-6 border-b border-gray-200">
          <p className="mb-1 text-lg font-semibold text-yellow-600">Take Flight</p>
          <p className="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900">$25</p>
          <p className="text-sm text-gray-500">Organization / month</p>
          <a href="#" className="w-full mt-6 btn btn-warning btn-lg">Get started for free &rarr;</a>
        </div>
        <ul className="flex flex-col flex-grow p-6 space-y-3">
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span className="text-gray-700"> Unlimited feedback </span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="The person who manages the feedback for the product."
              >One manager</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
              >1000 submitters</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span className="text-gray-700">Unlimited Private Boards</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
              >Custom domains support</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="Support for German, French, Polish and more."
              >Multi-language Support</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="Manage your customer feedback at the comfort of your phone. On iOS and Android."
              >Free iOS and Android apps</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span className="text-gray-700">3 Integrations</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-yellow-600">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span className="text-gray-700">New features every 14 days</span>
          </li>
        </ul>
      </div>
      <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div className="flex flex-col justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center justify-between">
              <p className="mb-1 text-lg font-semibold text-purple-700">Fly High</p>
              <span className="badge bg-primary-light text-primary">Most popular</span>
            </div>
            <p className="my-2 font-mono text-4xl font-extrabold text-gray-900">$50</p>
            <p className="text-sm text-gray-500">Organization / month</p>
          </div>
          <a href="#" className="w-full mt-6 btn btn-primary btn-lg">Get started for free &rarr;</a>
        </div>
        <ul className="flex flex-col flex-grow p-6 space-y-3">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <span className="font-medium text-purple-700">Everything in Take Flight</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Unlimited feedback
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="The person who manages the feedback for the product."
              >10 manager</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
              >7500 submitters</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Unlimited Integrations</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-purple-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Humane support
          </li>
        </ul>
      </div>
      <div className="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div className="flex flex-col justify-between p-6 border-b border-gray-200">
          <div>
            <p className="mb-1 text-lg font-semibold text-pink-600">Enterprise</p>
            <p className="my-2 text-4xl font-bold text-gray-900">Custom</p>
            <p className="text-sm text-gray-500">Organization / month</p>
          </div>
          <a href="#" className="w-full mt-6 btn btn-light btn-lg">Initiate a chat &rarr;</a>
        </div>
        <ul className="flex flex-col flex-grow p-6 space-y-3">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-600">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <span className="font-medium text-pink-600">Everything in Fly High</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            Unlimited feedback
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="The person who manages the feedback for the product."
              >Unlimited manager</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="User is the person who submits the feedback. We are not counting the people who are upvoting features."
              >Unlimited submitters</span
            >
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span className="text-gray-700">Unlimited Integrations</span>
          </li>
          <li className="flex items-start">
            <svg viewBox="0 0 20 20" fill="currentColor" className="flex-none w-4 h-4 mt-1 mr-2 text-pink-700">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>

            <span
              className="text-gray-800 border-b-2 border-gray-500 border-dotted cursor-pointer"
              x-data="tooltip()"
              x-spread="tooltip"
              x-position="top"
              title="Access to developers to build custom features and changes for your enterprise."
              >Feature on-request</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</section> */}

      <section className="pt-4 pb-4 md:px-4">
        <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
          WaveMaxx
          <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-500 ml-2">
            Premium
          </mark>
        </h1>
        {/* <p className="mb-8 lg:mb-8 text-gray-500 dark:text-gray-400 ">Give website some animations and themes.</p> */}
        <div className="pb-8 px-4 mx-auto max-w-screen-xl">
          <div className=" text-center mb-8 lg:mb-12">
            <h2 className="mb-2 md:text-3xl text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 text-gray-500 text-sm dark:text-gray-400">
              "Empowering open-source projects with collaborative tools, issue
              tracking, and hiring."
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 gap-6 lg:space-y-0">
            <div className="flex flex-col p-2 mx-auto max-w-lg text-center text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
              <h3 className=" mt-2 text-2xl font-semibold">Individual</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                "For those who wish to grow their network and work on real
                projects."
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹0</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
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
                  <span>Individual configuration</span>
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
                  <span>No setup, or hidden fees</span>
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
                    Team size:{" "}
                    <span className="font-semibold">100+ developers</span>
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
                    Premium support:{" "}
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
                    Free updates:{" "}
                    <span className="font-semibold">36 months</span>
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-green-900"
              >
                Current plan
              </a>
            </div>
            <div className="flex flex-col p-2 mx-auto max-w-lg text-center text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
              <h3 className="mt-2 text-2xl font-semibold">Starter</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                "Best option for your next open-source project and startup."
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹29</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
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
                  <span>Individual configuration</span>
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
                  <span>No setup, or hidden fees</span>
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
                    Team size:{" "}
                    <span className="font-semibold">10 developers</span>
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
                    Premium support:{" "}
                    <span className="font-semibold">24 months</span>
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
                    Free updates:{" "}
                    <span className="font-semibold">24 months</span>
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-blue-900"
              >
                Get started
              </a>
            </div>

            <div className="flex flex-col p-2 mx-auto max-w-lg text-center text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
              <h3 className=" mt-2 text-2xl font-semibold">Enterprise</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                "Relevant for multiple users, extended & premium support."
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹99</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
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
                  <span>Individual configuration</span>
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
                  <span>No setup, or hidden fees</span>
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
                    Team size:{" "}
                    <span className="font-semibold">100+ developers</span>
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
                    Premium support:{" "}
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
                    Free updates:{" "}
                    <span className="font-semibold">36 months</span>
                  </span>
                </li>
              </ul>

              <a
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-blue-900"
              >
                Get started
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
          <label htmlFor="upiId">UPI ID:</label>
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={(event) => setUpiId(event.target.value)}
            required
          />
          <label htmlFor="merchantId">Merchant ID:</label>
          <input
            type="text"
            id="merchantId"
            value={merchantId}
            onChange={(event) => setMerchantId(event.target.value)}
            required
          />
          <button type="submit">Pay with Google Pay</button>
        </form>
      </section>
    </>
  );
}
