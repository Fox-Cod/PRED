import React from "react";

import { Link } from "react-router-dom";

export default function Chat() {
    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
                    <h2 className="mr-auto text-lg font-medium">Vista de Equipas</h2>
                    <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
                        <Link to="/add-team" className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md" >
                            Criar uma equipa
                        </Link>
                    </div>
                </div>







                <div className="intro-y mt-5 grid grid-cols-12 gap-5">
                    {/* BEGIN: Chat Side Menu */}
                    <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                        <div className="intro-y pr-1">
                            <div className="box p-2">
                                <ul data-tw-merge="" role="tablist" className="w-full flex">
                                    <li
                                        id="chats-tab"
                                        data-tw-merge=""
                                        role="presentation"
                                        className="focus-visible:outline-none flex-1"
                                    >
                                        <button
                                            data-tw-merge=""
                                            data-tw-target="#chats"
                                            role="tab"
                                            className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium active w-full py-2"
                                        >
                                            Chats
                                        </button>
                                    </li>
                                    <li
                                        id="friends-tab"
                                        data-tw-merge=""
                                        role="presentation"
                                        className="focus-visible:outline-none flex-1"
                                    >
                                        <button
                                            data-tw-merge=""
                                            data-tw-target="#friends"
                                            role="tab"
                                            className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium w-full py-2"
                                        >
                                            Friends
                                        </button>
                                    </li>
                                    <li
                                        id="profile-tab"
                                        data-tw-merge=""
                                        role="presentation"
                                        className="focus-visible:outline-none flex-1"
                                    >
                                        <button
                                            data-tw-merge=""
                                            data-tw-target="#profile"
                                            role="tab"
                                            className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium w-full py-2"
                                        >
                                            Profile
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div
                                data-transition=""
                                data-selector=".active"
                                data-enter="transition-[visibility,opacity] ease-linear duration-150"
                                data-enter-from="!p-0 !h-0 overflow-hidden invisible opacity-0"
                                data-enter-to="visible opacity-100"
                                data-leave="transition-[visibility,opacity] ease-linear duration-150"
                                data-leave-from="visible opacity-100"
                                data-leave-to="!p-0 !h-0 overflow-hidden invisible opacity-0"
                                id="chats"
                                role="tabpanel"
                                aria-labelledby="chats-tab"
                                className="tab-pane active"
                            >
                                <div className="pr-1">
                                    <div className="box mt-5 px-5 pb-5 pt-5 lg:pb-0">
                                        <div className="relative text-slate-500">
                                            <input
                                                data-tw-merge=""
                                                type="text"
                                                placeholder="Search for messages or users..."
                                                className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 border-transparent bg-slate-100 px-4 py-3 pr-10"
                                            />
                                            <i
                                                data-tw-merge=""
                                                data-lucide="search"
                                                className="stroke-1.5 inset-y-0 right-0 my-auto mr-3 hidden h-4 w-4 sm:absolute"
                                            />
                                        </div>
                                        <div className="scrollbar-hidden overflow-x-auto">
                                            <div className="mt-5 flex">
                                                <a className="mr-4 w-10 cursor-pointer" href="">
                                                    <div className="image-fit h-10 w-10 flex-none rounded-full">
                                                        <img
                                                            className="rounded-full"
                                                            src="dist/images/fakers/profile-6.jpg"
                                                            alt="Midone - Tailwind Admin Dashboard Template"
                                                        />
                                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600"></div>
                                                    </div>
                                                    <div className="mt-2 truncate text-center text-xs text-slate-500">
                                                        Al Pacino
                                                    </div>
                                                </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-list scrollbar-hidden mt-4 h-[525px] overflow-y-auto pr-1 pt-1">
                                    <div className="intro-x cursor-pointer box relative flex items-center p-5">
                                        <div className="image-fit mr-1 h-12 w-12 flex-none">
                                            <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-6.jpg"
                                                alt="Midone - Tailwind Admin Dashboard Template"
                                            />
                                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600"></div>
                                        </div>
                                        <div className="ml-2 overflow-hidden">
                                            <div className="flex items-center">
                                                <a className="font-medium" href="#">
                                                    Al Pacino
                                                </a>
                                                <div className="ml-auto text-xs text-slate-400">01:10 PM</div>
                                            </div>
                                            <div className="mt-0.5 w-full truncate text-slate-500">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy
                                                text ever since the 1500
                                            </div>
                                        </div>
                                        <div className="absolute right-0 top-0 -mr-1 -mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                                            4
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* END: Chat Side Menu */}
                    {/* BEGIN: Chat Content */}
                    <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
                        <div className="chat-box box h-[782px]">
                            {/* BEGIN: Chat Active */}
                            <div className="flex h-full flex-col">
                                <div className="flex flex-col border-b border-slate-200/60 px-5 py-4 dark:border-darkmode-400 sm:flex-row">
                                    <div className="flex items-center">
                                        <div className="image-fit relative h-10 w-10 flex-none sm:h-12 sm:w-12">
                                            <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-6.jpg"
                                                alt="Midone - Tailwind Admin Dashboard Template"
                                            />
                                        </div>
                                        <div className="ml-3 mr-auto">
                                            <div className="text-base font-medium">Al Pacino</div>
                                            <div className="text-xs text-slate-500 sm:text-sm">
                                                Hey, I am using chat <span className="mx-1">•</span>
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mx-5 mt-5 flex items-center border-t border-slate-200/60 px-5 pt-3 sm:mx-0 sm:ml-auto sm:mt-0 sm:border-0 sm:px-0 sm:pt-0">
                                        <a className="h-5 w-5 text-slate-500" href="#">
                                            <i
                                                data-tw-merge=""
                                                data-lucide="search"
                                                className="stroke-1.5 w-5 h-5"
                                            />
                                        </a>
                                        <a className="ml-5 h-5 w-5 text-slate-500" href="#">
                                            <i
                                                data-tw-merge=""
                                                data-lucide="user-plus"
                                                className="stroke-1.5 w-5 h-5"
                                            />
                                        </a>
                                        <div
                                            data-tw-merge=""
                                            data-tw-placement="bottom-end"
                                            className="dropdown relative ml-auto sm:ml-3"
                                        >
                                            <a
                                                data-tw-toggle="dropdown"
                                                aria-expanded="false"
                                                href="javascript:;"
                                                className="cursor-pointer h-5 w-5 text-slate-500"
                                            >
                                                <i
                                                    data-tw-merge=""
                                                    data-lucide="more-vertical"
                                                    className="stroke-1.5 w-5 h-5"
                                                />
                                            </a>
                                            <div
                                                data-transition=""
                                                data-selector=".show"
                                                data-enter="transition-all ease-linear duration-150"
                                                data-enter-from="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                data-enter-to="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave="transition-all ease-linear duration-150"
                                                data-leave-from="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave-to="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                className="dropdown-menu absolute z-[9999] hidden"
                                            >
                                                <div
                                                    data-tw-merge=""
                                                    className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 w-40"
                                                >
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="share"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Share Contact
                                                    </a>
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="settings"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Settings
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5">
                                    <div className="float-left mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                                        <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">
                                            <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-6.jpg"
                                                alt="Midone - Tailwind Admin Dashboard Template"
                                            />
                                        </div>
                                        <div className="rounded-r-md rounded-t-md bg-slate-100 px-4 py-3 text-slate-500 dark:bg-darkmode-400">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div className="mt-1 text-xs text-slate-500">2 mins ago</div>
                                        </div>
                                        <div
                                            data-tw-merge=""
                                            data-tw-placement="bottom-end"
                                            className="dropdown relative my-auto ml-3 hidden sm:block"
                                        >
                                            <a
                                                data-tw-toggle="dropdown"
                                                aria-expanded="false"
                                                href="javascript:;"
                                                className="cursor-pointer h-4 w-4 text-slate-500"
                                            >
                                                <i
                                                    data-tw-merge=""
                                                    data-lucide="more-vertical"
                                                    className="stroke-1.5 h-4 w-4"
                                                />
                                            </a>
                                            <div
                                                data-transition=""
                                                data-selector=".show"
                                                data-enter="transition-all ease-linear duration-150"
                                                data-enter-from="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                data-enter-to="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave="transition-all ease-linear duration-150"
                                                data-leave-from="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave-to="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                className="dropdown-menu absolute z-[9999] hidden"
                                            >
                                                <div
                                                    data-tw-merge=""
                                                    className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 w-40"
                                                >
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="corner-up-left"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Reply
                                                    </a>
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="trash"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear-both" />
                                    <div className="float-right mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                                        <div
                                            data-tw-merge=""
                                            data-tw-placement="bottom-end"
                                            className="dropdown relative my-auto mr-3 hidden sm:block"
                                        >
                                            <a
                                                data-tw-toggle="dropdown"
                                                aria-expanded="false"
                                                href="javascript:;"
                                                className="cursor-pointer h-4 w-4 text-slate-500"
                                            >
                                                <i
                                                    data-tw-merge=""
                                                    data-lucide="more-vertical"
                                                    className="stroke-1.5 h-4 w-4"
                                                />
                                            </a>
                                            <div
                                                data-transition=""
                                                data-selector=".show"
                                                data-enter="transition-all ease-linear duration-150"
                                                data-enter-from="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                data-enter-to="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave="transition-all ease-linear duration-150"
                                                data-leave-from="!mt-1 visible opacity-100 translate-y-0"
                                                data-leave-to="absolute !mt-5 invisible opacity-0 translate-y-1"
                                                className="dropdown-menu absolute z-[9999] hidden"
                                            >
                                                <div
                                                    data-tw-merge=""
                                                    className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 w-40"
                                                >
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="corner-up-left"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Reply
                                                    </a>
                                                    <a className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                                        <i
                                                            data-tw-merge=""
                                                            data-lucide="trash"
                                                            className="stroke-1.5 mr-2 h-4 w-4"
                                                        />
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-l-md rounded-t-md bg-primary px-4 py-3 text-white">
                                            Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                                            <div className="mt-1 text-xs text-white text-opacity-80">
                                                1 mins ago
                                            </div>
                                        </div>
                                        <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">
                                            <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-3.jpg"
                                                alt="Midone - Tailwind Admin Dashboard Template"
                                            />
                                        </div>
                                    </div>
                                    <div className="clear-both" />
                                </div>

                                <div className="flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                                    <textarea
                                        data-tw-merge=""
                                        rows={1}
                                        placeholder="Type your message..."
                                        className="border-t border-slate-200/60 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm rounded-md placeholder:text-slate-400/90 focus:ring-primary focus:ring-opacity-20 focus:border-opacity-40 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 h-[46px] resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600"
                                        defaultValue={""}
                                    />

                                    <div class="relative mr-3 h-4 w-4 text-slate-500 sm:mr-5 sm:h-5 sm:w-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                        <input data-tw-merge="" type="file" class="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 absolute left-0 top-0 h-full opacity-0" />
                                    </div>

                                    <a class="mr-5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-10 sm:w-10" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                                    </a>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}