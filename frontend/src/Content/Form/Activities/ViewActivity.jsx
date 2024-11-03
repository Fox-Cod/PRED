import React from "react";
import { useParams } from "react-router-dom";
import { ActivityView, Commentary } from "../../../Components/Other/Dublication";
export default function ViewActivity() {
    const { activityId } = useParams();
    return (
        <>
            <div className="md:max-w-auto min-h-screen max-w-full flex-1 rounded-[1.3rem] bg-slate-100 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y box mt-8 xl:w-3/5 mx-auto item-center">
                    <ActivityView activityId={activityId} />
                    {/* BEGIN: Comments */}
                    <Commentary activityId={activityId} />
                    {/* END: Comments */}
                </div >
            </div >

        </>
    )
}