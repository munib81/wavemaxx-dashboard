import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import * as imageConversion from "image-conversion";
import { technologyTags } from "../../constants/technology";

export default function General({ userDetails }) {
  //console.log(userDetails?.id, "userDetails?.id");

  const [userName, setUserName] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [userTechStack, setUserTechStack] = useState([]);
  const [userBio, setUserBio] = useState();

  useEffect(() => {
    setUserName(userDetails?.name || "");
    setUserAvatar(
      userDetails?.avatar_url ||
        "https://avatars.githubusercontent.com/u/59870781?v=4"
    );
    setUserTechStack(userDetails?.techStack || []);
    setUserBio(userDetails?.bio || "");
  }, [userDetails]);

  const [searchInput, setSearchInput] = useState("");
  const allLanguages = [...technologyTags];

  const handleLanguageSelect = (selectedLanguage) => {
    if (!userTechStack.includes(selectedLanguage)) {
      setUserTechStack([...userTechStack, selectedLanguage]);
      setSearchInput("");
    }
  };

  const handleRemoveLanguage = (removedLanguage) => {
    //console.log(removedLanguage, "removedLanguage");
    const updatedLanguages = userTechStack.filter(
      (language) => language != removedLanguage
    );
    setUserTechStack(updatedLanguages);
  };

  // Filter and sort available languages based on user input
  const [availableLanguages, setAvailableLanguages] = useState(allLanguages);

  useEffect(() => {
    const filteredLanguages = allLanguages
      .filter((language) => !userTechStack.includes(language))
      .filter((language) =>
        language.toLowerCase().includes(searchInput.toLowerCase())
      )
      .sort(
        (a, b) =>
          a.toLowerCase().indexOf(searchInput.toLowerCase()) -
          b.toLowerCase().indexOf(searchInput.toLowerCase())
      );

    setAvailableLanguages(filteredLanguages);
  }, [searchInput]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && availableLanguages) {
      handleLanguageSelect(availableLanguages[0]);
    }
  };

  const userNameUpdate = (event) => {
    setUserName(event.target.value);
  };

  const userBioUpdate = (event) => {
    setUserBio(event.target.value);
  };

  const subjectUpdate = (event) => {
    setSubject(event.target.value);
  };
  const messageUpdate = (event) => {
    setMessage(event.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    //console.log(file);
    const base64 = await convertToBase64(file);
    setUserAvatar(base64);
  };

  const handleSubmit = (e) => {
    // document.getElementById("email").value = "";
    // document.getElementById("subject").value = "";
    // document.getElementById("message").value = "";

    e.preventDefault();
    const postURL = `/api/users/${userDetails?.id}`;
    fetch(postURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // submittedAt: Date.now(),
        name: userName,
        techStack: userTechStack,
        avatar_url: userAvatar,
        bio: userBio,
        // subject: Subject,
        // message: Message,
      }),
    }).then(() => {
      toast.success("Profile Updated", {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, for example:
    handleSubmit();
  };

  return (
    <section className="pt-4 pb-4 md:px-4">
      <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
        WaveMaxx
        <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-500 ml-2">
          Account
        </mark>
      </h1>
      <p className=" text-gray-500 dark:text-gray-400 ">
        Edit profile details and hiring readiness from here.
      </p>
      <div className="max-w-4xl px-2 py-4 lg:py-8">
        {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Profile</h2> */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="w-full">
              <label
                for="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userName}
                placeholder="enter profile name"
                onChange={userNameUpdate}
                required
              ></input>
            </div>
            <div className="w-full">
              <label
                for="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Login
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={userDetails?.login}
                placeholder="user login"
                readOnly
                disabled
              ></input>
            </div>
            <div className="sm:col-span-2">
              <div className="block w-full p-4 bg-navbarDark border border-gray-600 mb-3 rounded">
                <label
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlfor="grid-password"
                >
                  Profile Logo
                </label>
                <div className="shrink-0 mt-5">
                  <img
                    className="h-20 w-20 object-cover rounded-full"
                    src={userAvatar}
                    alt="Current profile photo"
                  />
                </div>
                <label className="block pt-2">
                  <span className="sr-only t-2">Choose profile photo</span>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    className="w-full file:cursor-pointer text-sm text-gray-200
                              file:mr-4 file:py-2 file:px-4
                              file:rounded file:border-0
                              file:text-sm file:font-semibold
                              file:bg-navbarDark file:text-white
                              hover:file:bg-navbarDark border border-gray-700
                              "
                  />
                </label>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tech Stack
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Search for a language"
                />
                <div className="absolute z-10 -inset-y-0 right-0 top-0 flex items-center pr-2 ">
                  {userTechStack.map((selectedLanguage, index) => (
                    <div
                      key={selectedLanguage}
                      className="flex items-center text-sm ml-1 bg-blue-900 text-white p-1 rounded"
                    >
                      <span>{selectedLanguage}</span>
                      <button
                        type="button"
                        className="text-gray-400 ml-1 hover:text-gray-100 focus:outline-none"
                        onClick={() => handleRemoveLanguage(selectedLanguage)}
                      >
                        &#x2716;
                      </button>
                    </div>
                  ))}
                </div>
                {searchInput?.length > 0 && (
                  <div className="bg-gray-50 border h-40 overflow-y-scroll border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1">
                    {availableLanguages?.length == 0 ? (
                      <span className="block px-2 py-1">
                        No languages found
                      </span>
                    ) : (
                      availableLanguages.map((language, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-2 py-1 hover:bg-gray-800 cursor-pointer"
                          onClick={() => handleLanguageSelect(language)}
                        >
                          <span>{language}</span>
                          <span className="text-gray-400 text-xs">
                            {language
                              .toLowerCase()
                              .indexOf(searchInput.toLowerCase())}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* NOTIFICATIONS */}

            {/* <div className="sm:col-span-2 mt-4 p-2 text-gray-900 bg-white border rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
              <div className="">
                <div className="grid ">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage what to see in your feed.
                  </p>
                </div>
              </div>
              <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 place-content-center">
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Job offers
                  </label>
                </div>
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-2"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-2"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New Clubs
                  </label>
                </div>
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project Gigs
                  </label>
                </div>
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-2"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-2"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Community Updates
                  </label>
                </div>
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-3"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-3"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Opportunities Mails
                  </label>
                </div>
                <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-checkbox-4"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-checkbox-4"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Feature Release
                  </label>
                </div>
              </div>

            </div> */}

            <div>
              <label
                for="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Freelancing
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultChecked value="Available">
                  Available
                </option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <div>
              <label
                for="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                charges (₹/hr)
              </label>
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue="500"
                placeholder="Ex. 12"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                defaultValue={userBio}
                placeholder="Tell us more about yourself..."
                onChange={userBioUpdate}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {/* {userBio}
              </textarea> */}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update profile
          </button>
        </form>
      </div>
    </section>
  );
}

async function convertToBase64(file, quality) {
  return new Promise(async (resolve, reject) => {
    const compressedImage = await imageConversion.compress(file, { quality });
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(compressedImage);
  });
}
