import React, { useState } from "react";
import { TopNav } from "./TopNavbar/TopNavbar";
import { SideNav } from "./SideNavbar/SideNavbar";

export default function Navigator({ children, isActive }) {
  return (
    <>
      {isActive ? (
        <div className="icewall px-5 sm:px-8 py-5 relative after:content-[''] after:bg-slate-200 after:from-blue-500 after:to-green-500 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]">
          <div className="md:px-10 md:pt-3 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700 before:content-[''] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30 after:content-[''] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600">
            <TopNav />
          </div>
          <div className="mt-12 wrapper relative before:content-[''] before:z-[-1] before:translate-y-[35px] before:opacity-0 before:w-[95%] before:rounded-[1.3rem] before:bg-primary/20 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50">
            <div className="wrapper-box bg-gradient-to-b from-theme-1 to-theme-2 flex rounded-[1.3rem] -mt-[7px] md:mt-0 dark:from-darkmode-400 dark:to-darkmode-400 translate-y-[35px] before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]">
              <SideNav />
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
    </>
  );
}
