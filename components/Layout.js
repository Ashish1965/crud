import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-screen">
        <Navbar />
      </div>
      <div className="flex-grow ">
        {props.children}
        <Toaster position="top-center" />
      </div>

      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
