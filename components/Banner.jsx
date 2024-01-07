import Link from "next/link";
import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

export default function Banner({ heading, title, description }) {
  return (
    <div className="py-8 mt-8 w-full flex justify-between">
      <div className="max-w-3xl">
        <h3 className="text-purple-500 font-semibold text-lg">{heading}</h3>
        <h2 className="md:text-3xl text-2xl font-semibold text-gray-200 capitalize">
          {title}
        </h2>
        <p className="md:text-base text-sm text-gray-400 mb-4">{description}</p>
        <Link
          className="text-purple-500 bg-gray-400 rounded p-2 hover:text-purple-600 font-semibold "
          href="/category"
        >
          Browse all components →
        </Link>
      </div>

      <div className="max-w-md md:flex flex-col my-auto hidden text-xs lg:text-sm">
        <ul role="list" className=" group-hover: space-y-2 py-6 text-gray-300 ">
          <li className="space-x-2">
            <IoShieldCheckmarkSharp className="inline-block text-purple-500 w-4 h-4 -mt-1 mr-1" />
            <span className="flex-wrap">Simply copy paste any component</span>
          </li>
          <li className="space-x-2">
            <IoShieldCheckmarkSharp className="inline-block text-purple-500 w-4 h-4 -mt-1 mr-1" />

            <span className="flex-wrap">CC BY 4.0 License</span>
          </li>
          <li className="space-x-2">
            <IoShieldCheckmarkSharp className="inline-block text-purple-500 w-4 h-4 -mt-1 mr-1" />

            <span className="flex-wrap">
              Give feedback{" "}
              <Link
                href={"/feedback"}
                className="hover:underline underline-offset-1"
              >
                here
              </Link>
              .
            </span>
          </li>
        </ul>
        {/* <p className="md:flex hidden items-center justify-center space-x-4 text-gray-300 text-center">
          <a
            href="https://twitter.com/wavemaxx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex space-x-2 items-center bg-indigo-700 hover:bg-indigo-800 p-1 rounded-lg "
          >
            <svg
              className="w-6 h-6 text-gray-100 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
              />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/wavemaxx/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex space-x-2 items-center bg-pink-600 hover:bg-pink-700 p-1 rounded-lg text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </p> */}
      </div>
    </div>
  );
}
