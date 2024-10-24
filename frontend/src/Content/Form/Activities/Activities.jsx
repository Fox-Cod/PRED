import React from "react";
import { ActivityList } from "../../../Components/Other/Dublication";
import { Link } from "react-router-dom";

export default function Activities() {
    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <h2 className="intro-y mt-10 text-lg font-medium">View - Activities</h2>
                <div className="intro-y col-span-12 mt-2 flex flex-wrap items-center sm:flex-nowrap">
                    <Link
                        to="/add-post"
                        data-tw-merge=""
                        className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md"
                    >
                        Adicionar publicação
                    </Link>
                    <div className="mx-auto hidden text-slate-500 md:block">
                    Descubra Novas Atividades!
                    </div>
                    <div className="mt-3 w-full sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
                        <div className="relative w-56 text-slate-500">
                            <input data-tw-merge="" type="text" placeholder="Pesquisar..." className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 !box w-56 pr-10" />
                            <svg className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                </div>
                <ActivityList />
            </div>
        </>
    )
}