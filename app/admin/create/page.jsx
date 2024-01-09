"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function FeedBack() {
  const { data: session } = useSession();

  var [userEmail, setEmail] = useState();
  var [Subject, setSubject] = useState();
  var [Message, setMessage] = useState();

  const emailUpdate = (event) => {
    // Dealing with name field changes to update our state
    setEmail(event.target.value);
  };
  const subjectUpdate = (event) => {
    // Dealing with name field changes to update our state

    setSubject(event.target.value);
  };
  const messageUpdate = (event) => {
    // Dealing with name field changes to update our state

    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Once the form has been submitted, this function will post to the backend
    const data = {
      submittedAt: Date.now(),
      adminUser: {
        name: session?.user?.name,
        email: session?.user?.email,
        id: session?.user?.id,
      },
      email: userEmail,
      subject: Subject,
      description: Message,
    };
    const postURL = "/api/forms/feedback"; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      toast("🔮 Feedback submitted", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
  };

  return (
    <section className="md:px-8 px-2 bg-gray-50 min-h-screen h-full">
      <div className="py-8 lg:py-10 md:px-4 px-2 p-2 rounded-2xl mx-auto  max-w-4xl ">
        <h2 className="text-2xl font-bold  text-gray-800">Give FeedBack</h2>
        <p className="mb-8 lg:mb-8  text-gray-600 text-sm ">
          Encountered a technical glitch? Your feedback is invaluable to us.
          Feel free to reach out and let us know how we can enhance your
          experience with our premium services.
        </p>
        <form method="POST" className="md:space-y-8 space-y-4">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Your email
            </label>
            <input
              onChange={emailUpdate}
              type="email"
              id="email"
              className=" bg-gray-200 border   text-sm rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Subject
            </label>
            <input
              onChange={subjectUpdate}
              type="text"
              id="subject"
              className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              onChange={messageUpdate}
              for="message"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm  bg-gray-200 rounded  border  focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>

          <div className="flex mt-2">
            <button
              onClick={handleSubmit}
              className="py-3 px-5 text-sm font-medium text-center text-white rounded bg-indigo-600 sm:w-fit hover:bg-indigo-700 bg-primary-600 hover:bg-primary-700 "
            >
              Create Device
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
