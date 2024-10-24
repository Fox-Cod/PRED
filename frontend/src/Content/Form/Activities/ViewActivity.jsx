import React from "react";
import { useParams } from "react-router-dom";
import { ActivityView } from "../../../Components/Other/Dublication";
export default function ViewActivity() {
    const { activityId } = useParams();
    return (
        <>
            <div className="md:max-w-auto min-h-screen max-w-full flex-1 rounded-[1.3rem] bg-slate-100 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y box mt-8 xl:w-3/5 mx-auto item-center">
                    <ActivityView activityId={activityId} />
                    {/* BEGIN: Comments */}
                    <div className="px-5">
                        <div className="intro-y pt-5 dark:border-darkmode-400">
                            <div className=" pb-5 pt-3 dark:border-darkmode-400">
                                <div className="flex w-full text-xs text-slate-500 sm:text-sm">
                                    <div className="mr-2">
                                        Comments:
                                        <span className="font-medium">33</span>
                                    </div>
                                    <div className="mr-2">
                                        Views: <span className="font-medium">187k</span>
                                    </div>
                                    <div className="ml-auto">
                                        Likes: <span className="font-medium">26k</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex w-full items-center">
                                    <div className="image-fit mr-3 h-8 w-8 flex-none">
                                        <img
                                            className="rounded-full"
                                            src="dist/images/fakers/profile-8.jpg"
                                            alt="Midone - Tailwind Admin Dashboard Template"
                                        />
                                    </div>
                                    <div className="relative flex-1 text-slate-600">
                                        <input
                                            data-tw-merge=""
                                            type="text"
                                            placeholder="Post a comment..."
                                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 rounded-full border-transparent bg-slate-100 pr-10"
                                        />
                                        <i
                                            data-tw-merge=""
                                            data-lucide="smile"
                                            className="stroke-1.5 absolute inset-y-0 right-0 my-auto mr-3 h-4 w-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="intro-y pb-10">
                            <div className="pt-5">
                                <div className="flex">
                                    <div className="image-fit h-10 w-10 flex-none sm:h-12 sm:w-12">
                                        <img
                                            className="rounded-full"
                                            src="dist/images/fakers/profile-3.jpg"
                                            alt="Midone - Tailwind Admin Dashboard Template"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex items-center">
                                            <a className="font-medium" href="">
                                                Arnold Schwarzenegger
                                            </a>
                                            <a className="ml-auto text-xs text-slate-500" href="">
                                                Reply
                                            </a>
                                        </div>
                                        <div className="text-xs text-slate-500 sm:text-sm">
                                            41 seconds ago
                                        </div>
                                        <div className="mt-2">
                                            There are many variations of passages of Lorem Ipsum available,
                                            but the majority have suffered alteration in some form, by
                                            injected humour, or randomi
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 border-t border-slate-200/60 pt-5 dark:border-darkmode-400">
                                <div className="flex">
                                    <div className="image-fit h-10 w-10 flex-none sm:h-12 sm:w-12">
                                        <img
                                            className="rounded-full"
                                            src="dist/images/fakers/profile-10.jpg"
                                            alt="Midone - Tailwind Admin Dashboard Template"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex items-center">
                                            <a className="font-medium" href="">
                                                Nicolas Cage
                                            </a>
                                            <a className="ml-auto text-xs text-slate-500" href="">
                                                Reply
                                            </a>
                                        </div>
                                        <div className="text-xs text-slate-500 sm:text-sm">
                                            43 seconds ago
                                        </div>
                                        <div className="mt-2">
                                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                                            It has roots in a piece of classical Latin literature from 45 BC,
                                            making it over 20
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END: Comments */}
                </div >
            </div >

        </>
    )
}