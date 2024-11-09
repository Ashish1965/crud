import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Create = () => {
  const cookie = nookies.get();

  const items = [
    { id: 1, name: "HR" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Sales" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select your Designation");

  const [gender, setGender] = useState("");
  const [media, setMedia] = useState();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [course, setCourse] = useState("");

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item) => {
    setSelected(item.name);
    setIsOpen(false);
  };
  // console.log(selected)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    mediaUrl: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const MediaUrl = await imageUpload();
      let stringToAdd = "s";

      // Position to add string
      let indexPosition = 4;

      // Using slice method to split string
      let newMediaUrl =
        MediaUrl.slice(0, indexPosition) +
        stringToAdd +
        MediaUrl.slice(indexPosition);

      // Display output
      // console.log(newMediaUrl);
      formData.designation = selected;
      formData.gender = gender;
      formData.course = course;
      formData.mediaUrl = newMediaUrl;
      // console.log(formData);

      const res = await fetch(`${baseUrl}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie.token,
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Mobile: formData.mobile,
          Designation: formData.designation,
          Gender: formData.gender,
          Course: formData.course,
          MediaUrl: formData.mediaUrl,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        toast.error(res2.error);
      } else {
        toast.success(res2.message);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: "",
          mediaUrl: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dhmqusghb");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhmqusghb/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    // console.log(res2.url);
    return res2.url;
  };

  return (
    <form className="max-w-md mx-auto mt-20" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Mobile No
          </label>
        </div>

        <div className="">
          <div className="relative z-10">
            <button
              onClick={toggleDropdown}
              className="bg-gray-700 text-gray-400 py-2 px-8 rounded"
            >
              {selected}
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-full bg-gray-950 border border-gray-300 rounded shadow-lg">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start mt-3">
          <h2 className="text-lg font-medium mb-2 text-gray-600">
            Select Gender:
          </h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-lg font-medium mb-2 text-gray-600">
            Select Course:
          </h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="course"
                value="MBA"
                checked={course === "MBA"}
                onChange={handleCourseChange}
                className="mr-2"
              />
              MBA
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="course"
                value="MSc"
                checked={course === "MSc"}
                onChange={handleCourseChange}
                className="mr-2"
              />
              MSc
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="course"
                value="BCA"
                checked={course === "BCA"}
                onChange={handleCourseChange}
                className="mr-2"
              />
              BCA
            </label>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex flex-row">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setMedia(event.target.files[0])}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white mb-11 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  // const res = await fetch(`${baseUrl}/api/orders`, {
  //   headers: {
  //     Authorization: cookie.token,
  //   },
  // });
  // const res2 = await res.json();
  // console.log(res2);
  return {
    props: {
      orders: [],
    },
  };
}
export default dynamic(() => Promise.resolve(Create), { ssr: false });
