// ComponentCard.js
// import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "react-toastify";
import { LuMinimize2 } from "react-icons/lu";
import parse from "html-react-parser";
import { formatDistanceToNow } from "date-fns";
import { playNotificationSound } from "@/components/notificationSound";

import { IoHeart } from "react-icons/io5";

import {
  docco,
  dracula,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ImageLoader from "./ImageLoader";

import { signIn, useSession } from "next-auth/react";

export default function ComponentCard({ component }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const [buttonText, setButtonText] = useState("Copy to Clipboard");

  const { data: session } = useSession();

  const [isUserLogin, setIsUserLogin] = useState(false);

  const likeComponent = () => {
    //console.log("liked");
    toast("❤ Liked Component", {
      position: "top-center",
      onOpen: () => {
        playNotificationSound();
      },
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });
  };

  const handleCopy = () => {
    setButtonText("Component Copied!!");
    toast("🥳 Component Copied!!", {
      position: "top-center",
      // onOpen: () => {
      //   playNotificationSound();
      // },
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });

    // Revert the button text after 3 seconds
    setTimeout(() => {
      setButtonText("Copy to Clipboard");
    }, 3000);
  };

  // const date = new Date(component.createdAt);
  // const formattedDate = date.toLocaleString(); // Adjust the format as needed
  const date = new Date(component.createdAt);
  const daysAgo = formatDistanceToNow(date, { addSuffix: true });

  const [isUserPremium, setIsUserPremium] = useState(false);
  // const blurClass = !isUserPremium && component.visibility === "paid" ? "blur-sm" : "";

  const [blurClass, setBlurClass] = useState("");

  useEffect(() => {
    if (session) {
      setIsUserLogin(true);
      if (session.user.plan === "premium") {
        setIsUserPremium(true);
      }
    }
    setBlurClass(
      !isUserPremium && component.visibility === "paid" ? "blur-sm" : ""
    );
  }, [session, isUserPremium, component?.visibility]);

  if (!component) return null;

  return (
    <>
      <button
        // href={`/components/${component.slug}`}
        onClick={handleDrawerOpen}
        className={`rounded-md relative overflow-hidden border-2 shadow-xl bg-gray-200 group border-gray-600 ${
          component.visibility === "free"
            ? "hover:border-green-600 "
            : "hover:border-yellow-500"
        } transition-all md:p-4 p-0`}
      >
        <img
          className="w-full h-48  object-cover group-hover:scale-125 rounded-lg duration-500 transition-all"
          src={`/assets/${component.folderName}/${component.fileName}.png`}
          blurdataurl={component.image}
          loading="lazy" // Lazy loading attribute
          alt="thumbnail"
        />
        {/* <div className="mt-2 w-full h-60 p-2 ">
          <div className="scaled-component">
            {parse(`${component.htmlCode}`)}
          </div>
        </div> */}
        <h2 className="hidden text-white bg-gray-700 px-1 rounded text-sm group-hover:flex absolute bottom-8 right-1">
          {component.name}
        </h2>
        <div className="hidden group-hover:flex absolute bottom-1 right-1">
          {component.tags &&
            component.tags.map((tag, i) => {
              return (
                <span
                  key={i}
                  className="text-xs capitalize mr-1 bg-purple-600 text-white rounded p-1"
                >
                  {tag}
                </span>
              );
            })}
        </div>
        {component.visibility === "paid" && (
          <div className="hidden group-hover:absolute group-hover:flex top-1 right-1">
            <span className="text-xs  mr-1 bg-yellow-500 text-white rounded p-1">
              Go Pro
            </span>
          </div>
        )}
        {component.visibility === "free" && (
          <div className="hidden group-hover:absolute group-hover:flex top-1 right-1">
            <span className="text-xs  mr-1 bg-green-600 text-white rounded p-1">
              Free
            </span>
          </div>
        )}
        {/* <p className="text-sm pt-1">{component.category}</p> */}
      </button>

      {isDrawerOpen && (
        <div className="fixed py-10 inset-0 z-40 bg-black bg-opacity-50">
          <div
            id="drawer-js-example"
            className={`absolute z-50 shadow-xl overflow-y-auto pb-20 mb-10 h-screen xl:w-2/5 md:w-2/3 w-4/5  p-4 bg-gray-400 top-0  right-0 transition-transform duration-500 ease-in-out transform translate-x-0`}
            tabIndex="-1"
          >
            {/* Drawer content goes here */}
            <div className="pt-14 flex justify-between">
              <div className="flex gap-2 mb-4">
                <h5 className=" inline-flex items-center text-base font-semibold text-gray-100">
                  {component.name || "Check out More Components"}
                </h5>
                {component.visibility === "paid" ? (
                  <span className="text-xs  mr-1 bg-yellow-400 text-white rounded p-1">
                    Premium
                  </span>
                ) : (
                  <span className="text-xs  mr-1 bg-green-600 text-white rounded p-1">
                    Free
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {/* <button
                  onClick={() => likeComponent()}
                  className=" flex text-xs  mr-2 md:text-sm rounded-md p-1 h-fit hover:bg-gray-900 bg-gray-400 border border-gray-600 text-white"
                >
                  <IoHeart className="text-xl text-red-500 mr-1" />
                  Like
                </button> */}

                <button
                  type="button"
                  onClick={handleDrawerClose}
                  className=" inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm    hover:bg-gray-900 bg-gray-400 border border-gray-600 text-white"
                >
                  <LuMinimize2 className="text-lg" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div>
              {component.tags &&
                component.tags.map((tag, i) => {
                  return (
                    <span
                      key={i}
                      className="md:text-sm text-xs capitalize mr-1 bg-purple-700 text-white rounded p-1"
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
            <div className="mt-2">
              {isUserPremium && component.visibility === "paid" && (
                <CopyToClipboard
                  text={component.htmlCode.trim()}
                  onCopy={handleCopy}
                >
                  <button
                    type="submit"
                    id="copybutton"
                    className={`text-white justify-center flex items-center bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-800 hover:to-purple-700  w-full  font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-2 py-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-800`}
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                      <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                    </svg>{" "}
                    {buttonText}
                  </button>
                </CopyToClipboard>
              )}

              {!isUserPremium && component.visibility === "paid" && (
                <Link
                  type="submit"
                  href={`/pricing`}
                  id="copybutton"
                  className={`text-white justify-center flex items-center bg-yellow-400 hover:bg-yellow-500 w-full  font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-2 py-2 mb-2  focus:outline-none focus:ring-indigo-800`}
                >
                  <svg
                    className="w-3.5 h-3.5 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                    <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                  </svg>{" "}
                  Unlock All Premium Components
                </Link>
              )}

              {component.visibility === "free" && (
                <CopyToClipboard text={component.htmlCode} onCopy={handleCopy}>
                  <button
                    type="submit"
                    id="copybutton"
                    className={`text-white justify-center flex items-center bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-800 hover:to-purple-700 w-full  font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-2 py-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-800`}
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                      <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                    </svg>{" "}
                    {buttonText}
                  </button>
                </CopyToClipboard>
              )}

              <div className="mt-2 group rounded-lg border border-gray-700 overflow-hidden">
                <img
                  // src={component.image}
                  src={`/assets/${component.folderName}/${component.fileName}.png`}
                  alt="thumbnail"
                  className="w-full rounded-lg  aspect-auto object-cover  "
                  loading="lazy"
                  blurdataurl={component.image}
                />
              </div>
              {/* <div className="mt-2 w-full h-80 overflow-scroll bg-gray-200 p-2 ">
                <div className="scaled-component">
                  {parse(`${component.htmlCode}`)}
                </div>
              </div> */}

              {/* {isUserPremium && component.visibility === "paid" && (
                <div className="rounded-lg px-1 py-1 mt-2 md:text-sm text-xs bg-slate-900 text-slate-50 flex items-center justify-center">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{ background: "transparent", flex: 1 }}
                    showLineNumbers
                    wrapLines
                  >
                    {component.htmlCode.trim()}
                  </SyntaxHighlighter>
                </div>
              )}

              {!isUserPremium && component.visibility === "paid" && (
                <div className="rounded-lg px-1 py-1 mt-2 md:text-sm text-xs bg-slate-900 text-slate-50 flex items-center justify-center">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{ background: "transparent", flex: 1 }}
                    showLineNumbers
                    wrapLines
                  >
                    {component.htmlCode.trim()}
                  </SyntaxHighlighter>
                </div>
              )}

              {component.visibility === "free" && (
                <div className="rounded-lg px-1 py-1 mt-2 md:text-sm text-xs bg-slate-900 text-slate-50 flex items-center justify-center">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{ background: "transparent", flex: 1 }}
                    showLineNumbers
                    wrapLines
                  >
                    {component.htmlCode.trim()}
                  </SyntaxHighlighter>
                </div>
              )} */}

              <div className="relative rounded-lg px-1 py-1 mt-2 md:text-sm text-xs bg-slate-900 text-slate-50">
                <div className={blurClass}>
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{ background: "transparent", flex: 1 }}
                    showLineNumbers
                    wrapLines
                  >
                    {component.htmlCode.trim()}
                  </SyntaxHighlighter>
                </div>

                {!isUserPremium && component.visibility === "paid" && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
                      <p className="mb-2">
                        Upgrade to premium to view this content.
                      </p>
                      <Link
                        href="/pricing"
                        className="text-indigo-500 hover:underline"
                      >
                        Go to Pricing
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-2 flex justify-between">
                <button className="bg-gray-900 text-xs text-gray-200 mr-2 font-medium rounded-md p-2">
                  CC By 4.0 License
                </button>
                <span className="text-xs h-fit mr-1 bg-gray-900 text-gray-200 rounded p-1">
                  Last Updated: {daysAgo}
                </span>
              </div>
              <div className="mt-4">
                <p className="md:text-sm  text-xs text-gray-300 pt-1">
                  <span className="text-gray-400 mb-2 font-semibold">
                    NOTE:{" "}
                  </span>
                  <p className="font-normal bg-gray-900 p-1 px-2 rounded-lg ">
                    In HTML, <span className="font-bold underline">class</span>{" "}
                    is an attribute used to specify a class name for an HTML
                    element, allowing CSS and JavaScript to select and access
                    the element, while in JSX, which is used with React,
                    <span className="font-bold underline">className</span> is
                    used instead of{" "}
                    <span className="font-bold underline">class</span> to avoid
                    conflict with the JavaScript keyword 'class'.
                  </p>
                </p>
              </div>
            </div>
          </div>

          <div
            className="fixed inset-0 z-40 "
            onClick={handleDrawerClose}
          ></div>
        </div>
      )}
    </>
  );
}
