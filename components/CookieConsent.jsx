"use client"
// components/CookieConsent.js
import { useState, useEffect } from 'react';

const CookieConsent = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if the user has previously accepted cookies
    const storedAcceptedStatus = localStorage.getItem('cookieConsentAccepted');
    if (storedAcceptedStatus === 'true') {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem('cookieConsentAccepted', 'true');
    // onAccept();
  };

  if (accepted) {
    return null; // Do not render the component if cookies are accepted
  }

  return (
    <div className="w-72 absolute right-10 bottom-10 bg-white rounded-lg shadow-md p-6 border border-gray-200" style={{ cursor: 'auto' }}>
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <img className="-mt-1" src="https://www.svgrepo.com/show/30963/cookie.svg" alt="Cookie Icon SVG" />
      </div>
      <span className="w-full sm:w-48 block leading-normal text-gray-800 text-md mb-3">
        We use cookies to provide a better user experience.
      </span>
      <div className="flex items-center justify-between">
        <a className="text-xs text-gray-400 mr-1 hover:text-gray-800" >
          Privacy Policy
        </a>
        <div className="w-1/2">
          <button
            type="button"
            onClick={handleAccept}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
