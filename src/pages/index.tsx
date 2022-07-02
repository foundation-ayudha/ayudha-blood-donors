// @ts-nocheck
import { useState } from "react";

import classnames from "tailwindcss-classnames";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const capitaliseName = (str: string) =>
  str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

const postApiCall = async ({ name, phone, bloodGroup, lastDonated }, setError) => {
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ name, phone, bloodGroup, lastDonated }),
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
      }
    })
    .catch((err) => {
      console.error(err);
      setError("error");
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
  const [lastDonated, setLastDonated] = useState(`${new Date().getFullYear()}-01-01`);
  const [error, setError] = useState(null);

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
        <h1 className="px-8 pt-6 pb-4 font-bold">Form Title</h1>
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
              If you are a donor of a special blood group, please select &lsquo;Other&rsquo;
              and specify.
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
              If don&apos;t remember the date when you last donated blood, leave it as is.
            </p>
          </div>

          <p className="text-gray-500 text-xs mb-4">
            By submitting the form by clicking the button, you agree to the{" "}
            <a
              className="align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
              href="#"
            >
              User Agreement
            </a>
          </p>
          <div className="flex items-center justify-between">
            <button
              className={buttonStyle(disableButton, error)}
              disabled={disableButton}
              type="button"
              onClick={() => {
                if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
                  alert("Phone number must be 10 digits");
                  return;
                }

                postApiCall(
                  {
                    name: capitaliseName(name),
                    phone,
                    bloodGroup:
                      bloodGroup === "other" ? specialBloodGroup : bloodGroup,
                    lastDonated,
                  },
                  setError
                );
              }}
            >
              {error === null
                ? "Register as Donor"
                : error === "noerror"
                ? "Registered Successfully"
                : error === "alreadyregistered" ? "Already Registered!" : "Error Occured"}
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Index;
