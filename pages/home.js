import React from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
let taskId;
const home = (props) => {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    mediaUrl: "",
  });

  const items = [
    { id: 1, name: "HR" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Sales" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select your Designation");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item) => {
    setSelected(item.name);
    setIsOpen(false);
  };

  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const [course, setCourse] = useState("");
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const [media, setMedia] = useState();

  const { Tasks } = props;
  const cookie = nookies.get();
  const User = cookie.user ? JSON.parse(cookie.user) : "";
  const handleEdit = (userId) => {
    taskId = userId;
    setIsEditOpen(!isEditOpen);
  };

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

  async function handleEditSubmit(event) {
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

      formData.designation = selected;
      formData.gender = gender;
      formData.course = course;
      formData.mediaUrl = newMediaUrl;
      console.log(formData.mediaUrl)
      const res = await fetch(`${baseUrl}/api/create`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: taskId,
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
      console.log(res2);
      if (res2.error) {
        toast({ html: res2.error, classes: "red" });
      } else {
        toast.success(res2.message);

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete(id) {
    const res = await fetch(`${baseUrl}/api/create`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.error(res2.error);
    } else {
      toast.success(res2.message);
      router.push("/home");
    }
  }

  

  return (
    <section className="text-gray-600 body-font">
      {isEditOpen && (
        <div className="floating-form absolute border-2 rounded-md bg-black p-5 w-1/3 item">
          <h1 className="text-black text-3xl text-center font-medium">
            Edit Form
          </h1>
          <form className="max-w-md mx-auto my-14" onSubmit={handleEditSubmit}>
            <div className="flex flex-col gap-y-5">
              <div className="relative z-0 w-full">
                <input
                  type="text"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Name
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label
                  for="floating_email"
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
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Mobile
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
              <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <img
            src="/devtown.png"
            alt="User"
            className="w-24 h-24 rounded-full"
          />
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            {User.name}
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            {User.email}
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {Tasks.map((Task) => (
            <div
              key={Task._id}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={Task.mediaUrl}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Name - <span className="font-semibold">{Task.name}</span>
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Email - <span className="font-semibold">{Task.email}</span>
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Mobile No -{" "}
                  <span className="font-semibold">{Task.mobile}</span>
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Designation -{" "}
                  <span className="font-semibold">{Task.designation}</span>
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Gender - <span className="font-semibold">{Task.gender}</span>
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-gray-500">
                  Course - <span className="font-semibold">{Task.course}</span>
                </p>

                <div className="flex flex-col md:flex-row justify-between mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(Task._id);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(Task._id);
                    }}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/create`, {
    headers: {
      Authorization: cookie.token,
    },
  });
  const res2 = await res.json();
  // console.log(res2);
  return {
    props: {
      Tasks: res2,
    },
  };
}

export default dynamic(() => Promise.resolve(home), { ssr: false });
