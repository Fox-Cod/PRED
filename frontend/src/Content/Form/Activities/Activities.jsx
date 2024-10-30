import React from "react";
import { ActivityList } from "../../../Components/Other/Dublication";
import { Link } from "react-router-dom";

export default function Activities() {
    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">        
                <ActivityList />
            </div>
        </>
    )
}