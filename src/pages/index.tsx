// @ts-nocheck
import { useState } from "react";

import classnames from "tailwindcss-classnames";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import Link from "next/link";

const capitaliseName = (str: string) =>
  str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

const postApiCall = async (
  { name, phone, bloodGroup, lastDonated, address },
  setError,
  setSubmitClicked
) => {
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ name, phone, bloodGroup, lastDonated, address }),
  })
    .then(async (res) => {
      const json = await res.json();
      if (res.status === 200) {
        if (json.message === "Already Registered") {
          setError("alreadyregistered");
        } else {
          setError("noerror");
        }
      } else {
        setError("error");
        setSubmitClicked(false);
      }
    })
    .catch((err) => {
      console.error(err);
      setError("error");
      setSubmitClicked(false);
    });
};

const submitButton = classnames(
  "bg-blue-500",
  "hover:bg-blue-700",
  "text-white",
  "font-bold",
  "py-2",
  "px-4",
  "rounded",
  "focus:shadow-outline"
);
const successButton = classnames(submitButton, {
  "bg-green-500": true,
  "cursor-not-allowed": true,
  "hover:bg-green-700": true,
});
const alreadyRegistered = classnames(submitButton, {
  "bg-yellow-500": true,
  "cursor-not-allowed": true,
  "hover:bg-yellow-700": true,
});
const errorButton = classnames(submitButton, {
  "bg-red-500": true,
  "cursor-not-allowed": true,
  "hover:bg-red-700": true,
});
const disabledButton = classnames(submitButton, {
  "bg-gray-500": true,
  "hover:bg-gray-700": true,
  "cursor-not-allowed": true,
});
const buttonStyle = (disable: boolean, error: string | null) => {
  if (error === null && disable) {
    return disabledButton;
  }

  if (error === null) {
    return submitButton;
  }

  if (error === "noerror") {
    return successButton;
  }

  if (error === "alreadyregistered") {
    return alreadyRegistered;
  }

  return errorButton;
};

const Index = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+ve");
  const [specialBloodGroup, setSpecialBloodGroup] = useState("");
  const [alreadyDonated, setAlreadyDonated] = useState(false);
  const dateToday = new Date();
  const [lastDonated, setLastDonated] = useState(
    `${dateToday.getFullYear()}-${(dateToday.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateToday.getDate().toString().padStart(2, "0")}`
  );
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const disableButton =
    name === "" ||
    phone === "" ||
    (bloodGroup === "other" && specialBloodGroup === "") ||
    error !== null;

  return (
    <Main
      meta={
        <Meta
          title="Blood Donors - Ayudha Foundation"
          description="An application to register yourself as a blood donor. This initiative was created by the Ayudha Foundation in Adilabad."
        />
      }
    >
      <div className="w-full shadow-md rounded">
        <h1 className="px-8 pt-6 pb-4 font-bold underline">
          Ayudha Blood Donors Registration
        </h1>
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:shadow-outline"
              id="phone"
              placeholder="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            <p className="text-gray-500 text-xs italic">
              No need to prefix it with +91.
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="bloodgroup"
            >
              Blood Group
            </label>
            <div className="relative mb-4">
              <select
                className="shadow appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="O+ve">O +ve</option>
                <option value="O-ve">O -ve</option>
                <option value="A+ve">A +ve</option>
                <option value="A-ve">A -ve</option>
                <option value="B+ve">B +ve</option>
                <option value="B-ve">B -ve</option>
                <option value="AB+ve">AB +ve</option>
                <option value="AB-ve">AB -ve</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-500 text-xs italic">
              If you are a donor of a special blood group, please select
              &lsquo;Other&rsquo; and specify.
            </p>
            {bloodGroup === "other" && (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sbloodgroup"
                >
                  Special Blood Group
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:shadow-outline"
                  id="sbloodgroup"
                  placeholder="Blood Group Name"
                  value={specialBloodGroup}
                  onChange={(e) => setSpecialBloodGroup(e.target.value)}
                ></input>
              </>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                id="alreadydonated"
                type="checkbox"
                value={alreadyDonated}
                onChange={(e) => setAlreadyDonated(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
              <label
                htmlFor="alreadydonated"
                className="ml-2 tracking-wide text-gray-700 font-normal"
              >
                Have you donated blood in past?
              </label>
            </div>
            {alreadyDonated && (
              <>
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="bloodgroup"
                >
                  Last Donated On
                </label>

                <input
                  id="lastdonated"
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:shadow-outline"
                  placeholder="Select date"
                  value={lastDonated}
                  onChange={(e) => setLastDonated(e.target.value)}
                ></input>
                <p className="text-gray-500 text-xs italic">
                  If you don&apos;t remember the date when you last donated
                  blood, leave it as is.
                </p>
              </>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:shadow-outline"
              id="phone"
              placeholder="Address(es)"
              type="textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <p className="text-gray-500 text-xs italic">
              Just so that we know where you stay when you need to be contacted.{" "}
              <br />
              For example: If your primary address is in Adilabad and you also
              stay in Hyderabad, please add both addresses. It would be helpful
              for all. <br />
              Ex: Write each address on a new line as shown below. <br /> <br />
              Shanthinagar, Adilabad <br />
              Begumpet, Hyderabad
            </p>
          </div>

          <p className="text-gray-500 text-xs mb-4">
            By submitting the form by clicking the button, you agree to the{" "}
            <span
              className="align-baseline font-bold text-xs text-blue-500 hover:text-blue-800 hover:underline cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              User Agreement
            </span>
          </p>
          <div className="items-center justify-between">
            <button
              className={buttonStyle(submitClicked || disableButton, error)}
              disabled={submitClicked || disableButton}
              type="button"
              onClick={() => {
                if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
                  alert("Phone number must be 10 digits");
                  return;
                }

                setSubmitClicked(true);
                postApiCall(
                  {
                    name: capitaliseName(name),
                    phone,
                    bloodGroup:
                      bloodGroup === "other" ? specialBloodGroup : bloodGroup,
                    lastDonated: alreadyDonated ? lastDonated : null,
                    address,
                  },
                  setError,
                  setSubmitClicked
                );
              }}
            >
              {error === null
                ? "Register as Donor"
                : error === "noerror"
                ? "Registered Successfully"
                : error === "alreadyregistered"
                ? "Already Registered!"
                : "Error Occured"}
            </button>
            {error === "noerror" && (
              <p className="text-green-500 text-xs mb-4">
                Thank you so much for registering yourself as a donor ❤️. You
                can contact us for available donors at any time.
              </p>
            )}
            {error === "alreadyregistered" && (
              <p className="text-yellow-500 text-xs mb-4">
                Seems like you have already registered with us.
              </p>
            )}
            {error && error !== "noerror" && error !== "alreadyregistered" && (
              <p className="text-red-500 text-xs mb-4">
                There seems to be some error. Please try again later. If you see
                this consistently, please contact us.
              </p>
            )}
          </div>
        </form>
      </div>
      {showModal ? (
        <>
          <div className="my-10 mx-2 justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">User Agreement</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-x-hidden overflow-y-auto h-full">
                  <p>
                    <b>
                      Our policy is simple: we do not collect any personal data
                      from you and we never use it for monetisation 🚫. Your
                      data is safe with us 🤝.
                    </b>
                  </p>
                  <ul className="list-disc ml-6">
                    <li className="text-base">
                      ✅ By registering with us you agree to share your Name,
                      Address, Blood Group and Contact info with us so you can
                      be contacted in future in the times of need.
                    </li>
                    <li className="text-base">
                      🩸 Your contact will only be shared to the concerned
                      person or we contact you directly in need of blood, if you
                      are in the best matches for the given situtaion. Apart
                      from this, your data is never shared to a third-party and
                      we never intend to do that.
                    </li>
                    <li className="text-base">
                      📔 This is purely inteded for the purpose of providing a
                      platform for blood donors to register themselves. This
                      data collection is only to solve the pain point of not
                      having a ready list of donors in critical times.
                    </li>
                    <li className="text-base">
                      🔒 We never share your information to anyone unless there
                      is a need for blood. We understand that the blood group
                      and contact data of a person are sensitive, hence we never
                      share with anyone without knowing the cause.
                    </li>
                    <li className="text-base">
                      🕵️‍♂️ Also the list is not public so no other data harvester
                      can get access to the list of data and put it to wrong use
                      as such in using the data for promotions or monetisation
                      or spamming etc.,
                    </li>
                    <li className="text-base">
                      🔐 Only a certain people have rights to view/edit/delete
                      the data, after you register with us. Edit is only used to
                      update the last date of blood donation and Delete rights
                      are only used when you want to delete your data from our
                      donors list (it is only done on request basis).
                    </li>
                  </ul>

                  <p className="text-base">
                    📝 Feel free to reach out to use if you have any queries.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Main>
  );
};

export default Index;
