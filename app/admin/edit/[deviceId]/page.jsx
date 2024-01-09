"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDevice() {
  const { data: session } = useSession();
  const router = useRouter();
  const { deviceId } = router.query;
  const [device, setDevice] = useState(null);
  const [rtuId, setRtuId] = useState("");
  const [centralId, setCentralId] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleRtuIdChange = (e) => setRtuId(e.target.value);
  const handleCentralIdChange = (e) => setCentralId(e.target.value);
  const handleLatChange = (e) => setLat(e.target.value);
  const handleLongChange = (e) => setLong(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      rtuId,
      centralId,
      location: { lat, long },
    };
    const postURL = `/api/devices/${deviceId}`;
    fetch(postURL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      toast("🔮 Device Updated", {
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
  };

  useEffect(() => {
    if (deviceId) {
      const getURL = `/api/devices/${deviceId}`;
      fetch(getURL)
        .then((res) => res.json())
        .then((data) => {
          setDevice(data);
          setRtuId(data.rtuId);
          setCentralId(data.centralId);
          setLat(data.location.lat);
          setLong(data.location.long);
        });
    }
  }, [deviceId]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Device Manager</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">You need to sign in first</h1>
          <p className="mt-3 text-2xl">
            You can sign in with your Google account
          </p>
          <p className="mt-3 text-xl">
            <a
              href={`/api/auth/signin`}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </main>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Device Manager</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <section className="md:px-8 px-2 bg-gray-50 min-h-screen h-full">
      <div className="py-8 lg:py-10 md:px-4 px-2 p-2 rounded-2xl mx-auto  max-w-4xl ">
        <h2 className="text-2xl font-bold  text-gray-800">Edit Device</h2>
        <p className="mb-8 lg:mb-8  text-gray-600 text-sm ">
          Edit an existing device.
        </p>
        <form method="POST" className="md:space-y-8 space-y-4">
          <div>
            <label
              htmlFor="deviceId"
              className="block text-sm font-medium text-gray-700"
            >
              Device ID
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="deviceId"
                id="deviceId"
                value={device.deviceId}
                disabled
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="rtuId"
              className="block text-sm font-medium text-gray-700"
            >
              RTU ID
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="rtuId"
                id="rtuId"
                value={rtuId}
                onChange={handleRtuIdChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="centralId"
              className="block text-sm font-medium text-gray-700"
            >
              Central ID
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="centralId"
                id="centralId"
                value={centralId}
                onChange={handleCentralIdChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <h1 className="block mb-2 text-sm font-medium text-gray-900">
              Add Location
            </h1>
            <div className="w-full gap-4 flex justify-between">
              <div className="w-full">
                <label
                  htmlFor="lat"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Latitude
                </label>
                <input
                  type="text"
                  id="lat"
                  value={lat}
                  onChange={handleLatChange}
                  className="block p-3 w-full text-sm bg-gray-200 rounded border focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="long"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Longitude
                </label>
                <input
                  type="text"
                  id="long"
                  value={long}
                  onChange={handleLongChange}
                  className="block p-3 w-full text-sm bg-gray-200 rounded border focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
