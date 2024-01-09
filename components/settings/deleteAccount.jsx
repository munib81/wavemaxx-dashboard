import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { playNotificationSound } from "@/components/notificationSound";

export default function DeleteAccount({ userDetails }) {
  //console.log(userDetails?.id);
  var [Subject, setSubject] = useState();
  var [Message, setMessage] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const subjectUpdate = (event) => {
    // Dealing with name field changes to update our state

    setSubject(event.target.value);
  };
  const messageUpdate = (event) => {
    // Dealing with name field changes to update our state

    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    const postURL = "/api/forms/leaving"; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // We should keep the fields consistent for managing this data later
        submittedAt: Date.now(),
        name: userDetails?.name,
        email: userDetails?.email,
        id: userDetails?.id,
        subject: Subject,
        message: Message,
      }),
    }).then(() => {
      toast("📚 Issues submitted", {
        position: "bottom-right",
        onOpen: () => {
          playNotificationSound();
        },

        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function (event) {
      document.getElementById("deleteButton").click();
    });
  }, []);

  const handleDeleteAccount = async (e) => {
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("deleteButton").textContent = "Deleting...";
    e.preventDefault();
    const postURL = `/api/users/${userDetails?.id}`; //Our previously set up route in the backend
    await fetch(postURL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setDeleteModal(false);
      toast.error("Profile Deleted", {
        position: "bottom-right",
        onOpen: () => {
          playNotificationSound();
        },

        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.href = "/";
    });
    document.getElementById("deleteButton").textContent = "Deleted";
  };

  return (
    <div>
      <section>
        <div className="pb-8 pt-4 md:px-4 px-2 max-w-screen-md">
          <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Delete
            <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-500 ml-2">
              WaveMaxx
            </mark>{" "}
            Account?
          </h1>
          <p className="mb-8 lg:mb-8 text-gray-500 dark:text-gray-400 ">
            Leaving platform?? drop some suggestions for us to improve.
          </p>
          <form className="space-y-4">
            <div>
              <label
                for="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Issues
              </label>
              <input
                onChange={subjectUpdate}
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                onChange={messageUpdate}
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                required
              ></textarea>
            </div>
          </form>
          <div className="flex items-center justify-center md:justify-start mt-2">
            <button
              onClick={handleSubmit}
              className="py-3 mt-4 px-3 text-sm font-medium text-center text-white rounded bg-blue-600 sm:w-fit hover:bg-blue-700 dark:bg-primary-600 dark:hover:bg-primary-700 "
            >
              Send message
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              id="deleteButton"
              data-modal-toggle="deleteModal"
              type="button"
              className="flex py-3 mt-4 px-3  text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center ml-4 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              <svg
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete my account
            </button>
          </div>
        </div>
      </section>

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navbar bg-opacity-50 dark:bg-opacity-80">
          <div
            id="ideaModal"
            tabIndex="-1"
            className="z-50 w-fit overflow-x-hidden overflow-y-auto bg-white rounded shadow-xl dark:bg-navbar border border-gray-700"
          >
            <div className="relative w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button
                  type="button"
                  onClick={() => setDeleteModal(false)}
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete your Account ?
                  <br />
                  <span className="font-semibold">{userDetails?.name}</span>
                  <br />
                  <span className=" font-light">{userDetails?.email}</span>
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    onClick={() => setDeleteModal(false)}
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    id="deleteYes"
                    data-modal-toggle="deleteModal"
                    onClick={handleDeleteAccount}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
