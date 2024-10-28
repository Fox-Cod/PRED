import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Config/contexts/context";
import { API_URL } from "../../Config/api";
import { getUserChats } from "../../Config/api/deviceAPI";
import SortTime, { ChatRoom } from "../../Components/Other/Other";

export default function Chat() {
    const { user } = useContext(Context);
    const { idFriend } = useParams();

    const [chats, setChats] = useState([]);
    const [selectedChatToken, setSelectedChatToken] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getUserChats();
                setChats(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, []);

    const handleChatClick = (chatToken) => {
        setSelectedChatToken(chatToken);
    };

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
                    <h2 className="mr-auto text-lg font-medium">Conversas</h2>
                    {/* <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
                        <Link to="/add-team" className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md" >
                            Criar uma equipa
                        </Link>
                    </div> */}
                </div>

                <div className="intro-y mt-5 grid grid-cols-12 gap-5">
                    {/* BEGIN: Chat Side Menu */}
                    <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                        {/* <div className="intro-y pr-1">
                            <div className="box p-2">
                                <ul data-tw-merge="" role="tablist" className="w-full flex">
                                    <li className="focus-visible:outline-none flex-1">
                                        <button className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium active w-full py-2">
                                            Conversas
                                        </button>
                                    </li>
                                    <li className="focus-visible:outline-none flex-1">
                                        <button className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium w-full py-2">
                                            Amigos
                                        </button>
                                    </li>
                                    <li className="focus-visible:outline-none flex-1">
                                        <button className="cursor-pointer block appearance-none px-5 border-transparent text-slate-700 dark:text-slate-400 [&.active]:dark:text-white rounded-md border-0 [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium w-full py-2">
                                            Profile
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        <div className="tab-content">
                            <div className="tab-pane active">
                                <div className="pr-1">
                                    <div className="box mt-0 px-5 pb-5 pt-5 lg:pb-0">
                                        <div className="scrollbar-hidden overflow-x-auto">
                                            <div className="flex">
                                                {user?.profile?.friends?.length > 0 ? (
                                                    user?.profile?.friends?.map((item, index) => (
                                                        <Link key={index} to={`/user-profile-view/${item?.friend?.idTeacher}`} className="mr-2 mt-0.5 ml-2 cursor-pointer">
                                                            <button className="bg-gray-400/80 text-white h-8 w-8 scale-110 font-bold overflow-hidden rounded-full zoom-in">
                                                                {item?.friend?.photo ? (<img src={`${API_URL}/${item?.friend?.photo}`} alt="Img Amigo" className="h-10 w-10 object-cover rounded-full" />) : (<div className="rounded-full-black"> {item?.friend?.name?.slice(0, 1).toUpperCase()}</div>)}
                                                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600"></div>
                                                            </button>
                                                            <div className="mt-2 mb-2 truncate text-center text-xs text-slate-500">
                                                                {item?.friend?.name}
                                                            </div>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="p-5 text-center" >
                                                        <p><span className="mr-auto ">Fazer novos amigos para conseguir mais!</span>
                                                            <br />Para o adicionar como amigo, vá ao seu perfil e clique em “Seguir”</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {chats.map((chat, index) =>
                                    <div key={index} className="chat-list scrollbar-hidden mt-4 h-[525px] overflow-y-auto pr-1 pt-1">
                                        <Link to={`/chat/${chat.chatToken}`} onClick={() => handleChatClick(chat.chatToken)} className="intro-x cursor-pointer box relative flex items-center p-5">
                                            <div className="image-fit mr-1 h-12 w-12 flex-none">
                                                {chat?.participantOne && user?.profile?.idTeacher === chat.participantOne.idTeacher ? (
                                                    chat?.participantTwo?.photo ? (
                                                        <img src={`${API_URL}/${chat.participantTwo.photo}`} alt="Friend's Avatar" className="rounded-full" />
                                                    ) : (
                                                        <div className="rounded-full bg-black text-white flex items-center justify-center w-10 h-10">
                                                            {chat.participantTwo.name?.slice(0, 1).toUpperCase()}
                                                        </div>
                                                    )
                                                ) : (
                                                    chat?.participantOne?.photo ? (
                                                        <img src={`${API_URL}/${chat.participantOne.photo}`} alt="Friend's Avatar" className="rounded-full" />
                                                    ) : (
                                                        <div className="rounded-full bg-black text-white flex items-center justify-center w-10 h-10">
                                                            {chat.participantOne.name?.slice(0, 1).toUpperCase()}
                                                        </div>
                                                    )
                                                )}

                                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600"></div>
                                            </div>
                                            <div className="ml-2 overflow-hidden">
                                                <div className="flex items-center">
                                                    <a className="font-medium" href="#">
                                                        {chat?.participantOne && user?.profile?.idTeacher === chat.participantOne.idTeacher
                                                            ? chat.participantTwo?.name
                                                            : chat.participantOne?.name}
                                                    </a>
                                                    <div className="ml-1 text-xs text-slate-400"><SortTime date={chat.lastMessageTime} /></div>
                                                </div>
                                                <div className="mt-0.5 w-full truncate text-slate-500">
                                                    _.messages
                                                </div>
                                            </div>
                                            <div className="absolute right-0 top-0 -mr-1 -mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                                                ?
                                            </div>
                                        </Link>
                                    </div>
                                )}
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
                                            {/* <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-6.jpg"
                                                alt="#"
                                            /> */}
                                        </div>
                                        <div className="ml-3 mr-auto">
                                            <div className="text-base font-medium">_.name</div>
                                            <div className="text-xs text-slate-500 sm:text-sm">
                                                _.about <span className="mx-1">•</span>
                                                Online?
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mx-5 mt-5 flex items-center border-t border-slate-200/60 px-5 pt-3 sm:mx-0 sm:ml-auto sm:mt-0 sm:border-0 sm:px-0 sm:pt-0">
                                        <a className="h-5 w-5 text-slate-500" href="#">
                                            1
                                        </a>
                                        <a className="ml-5 h-5 w-5 text-slate-500" href="#">
                                            2
                                        </a>
                                        <div className="dropdown relative ml-auto sm:ml-3">
                                            3
                                        </div>
                                    </div>
                                </div>
                                <ChatRoom chatToken={selectedChatToken} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}