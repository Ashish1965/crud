import React from 'react';
import dynamic from "next/dynamic";

const TaskItem = (props) => {
    const { title, description, date , id } = props;
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                {title}
              </h2>
              <p className="leading-relaxed text-base">
                {description}
              </p>
              <p className="leading-relaxed text-base font-semibold">
                {date}
              </p>
              <button >Edit</button>
            
            </div>
            
          </div>
  )
}

export default dynamic(() => Promise.resolve(TaskItem), { ssr: false });
