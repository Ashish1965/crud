import React from "react";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa6";
import baseUrl from "@/helpers/baseUrl";
import { serialize } from "cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: formData.email,
        Password: formData.password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.error(res2.error);
    } else {
      toast.success(res2.message);
      setFormData({
        email: "",
        password: "",
      });
      console.log(res2);
      Cookies.set("token", res2.token);
      Cookies.set("user", JSON.stringify(res2.user));
      router.push("/home");
    }
  }

  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
        <div className=" w-full md:w-3/4">
          <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
            <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">
              Login to your account
            </h1>
            <h1 className="text-sm font-medium text-gray-600 m-2">
              Login using Social accounts
            </h1>
            <div className="text-lg lg:text-xl text-center space-x-5 m-2 flex flex-row">
              <a
                href="#"
                className="text-white bg-blue-500 rounded-full px-[14px] py-[10px]"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white bg-cyan-400 rounded-full px-[14px] py-[10px]"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white bg-red-500 rounded-full px-[14px] py-[10px]"
              >
                <FaGooglePlusG />
              </a>
            </div>
            <h1 className="text-sm font-medium text-gray-600 m-2">OR</h1>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
            <div className="">
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" bg-gray-900 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="">
              <input
                type="password"
                placeholder="Enter Your Password"
                className=" bg-gray-900 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="text-center mt-7">
            <button className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 mb-6" type="submit">
              Sign In
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });

