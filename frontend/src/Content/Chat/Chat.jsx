import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Config/contexts/context";
import { API_URL } from "../../Config/api";
import { getUserChats } from "../../Config/api/deviceAPI";
import SortTime, { ChatRoom } from "../../Components/Other/Other";

export default function Chat() {
    const { user } = useContext(Context);
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
                {chats.length > 0 ? (
                    <>
                        <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
                            <h2 className="mr-auto text-lg font-medium">Conversas</h2>
                        </div>

                        <div className="intro-y mt-5 grid grid-cols-12 gap-5">
                            {/* Chat Side Menu */}
                            <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                                <div className="tab-content">
                                    <div className="tab-pane active">
                                        <div className="pr-1">
                                            <div className="box mt-0 px-5 pb-5 pt-5 lg:pb-0">
                                                <div className="scrollbar-hidden overflow-x-auto">
                                                    <div className="flex">
                                                        {user?.profile?.friends?.length > 0 ? (
                                                            user?.profile?.friends?.map((item, index) => (
                                                                <Link key={index} to={`/user-profile-view/${item?.friend?.idTeacher}`} className="mr-2 mt-0.5 ml-2 cursor-pointer">
                                                                    <button className="flex bg-gray-400/80 text-white h-10 w-10 scale-110 font-bold overflow-hidden rounded-full zoom-in">
                                                                        {item?.friend?.photo ? (
                                                                            <img src={`${API_URL}/${item?.friend?.photo}`} alt="Img Amigo" className="h-10 w-10 object-cover rounded-full" />
                                                                        ) : (
                                                                            <div className="flex items-center justify-center h-full w-full">
                                                                                {item?.friend?.name?.slice(0, 1).toUpperCase()}
                                                                            </div>
                                                                        )}
                                                                    </button>
                                                                    <div className="mb-2 mt-2 truncate text-center text-xs text-slate-500">
                                                                        {item?.friend?.name?.slice(0, 6)}
                                                                    </div>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div className="p-5 text-center">
                                                                <p>
                                                                    <span className="mr-auto">Fazer novos amigos para conseguir mais!</span>
                                                                    <br />Para o adicionar como amigo, vá ao seu perfil e clique em “Seguir”
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Chat List */}
                                        <div className="chat-list scrollbar-hidden mt-4 h-[525px] overflow-y-auto pr-1 pt-1">
                                            {chats.map((chat, index) => (
                                                <Link
                                                    key={index}
                                                    to={`/chat/${chat.chatToken}`}
                                                    onClick={() => handleChatClick(chat.chatToken)}
                                                    className="intro-x cursor-pointer box relative flex items-center p-5 mb-4"
                                                >
                                                    <div className="image-fit mr-1 h-12 w-12 flex-none">
                                                        {chat?.participantOne && user?.profile?.idTeacher === chat.participantOne.idTeacher ? (
                                                            chat?.participantTwo?.photo ? (
                                                                <img src={`${API_URL}/${chat.participantTwo.photo}`} alt="Friend's Avatar" className="rounded-full" />
                                                            ) : (
                                                                <div className="rounded-full bg-gray-400 font-bold text-white flex items-center justify-center w-12 h-12">
                                                                    {chat.participantTwo.name?.slice(0, 1).toUpperCase()}
                                                                </div>
                                                            )
                                                        ) : (
                                                            chat?.participantOne?.photo ? (
                                                                <img src={`${API_URL}/${chat.participantOne.photo}`} alt="Friend's Avatar" className="rounded-full" />
                                                            ) : (
                                                                <div className="rounded-full bg-gray-400 font-bold text-white flex items-center justify-center w-12 h-12">
                                                                    {chat.participantOne.name?.slice(0, 1).toUpperCase()}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="ml-2 overflow-hidden">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">
                                                                {chat?.participantOne && user?.profile?.idTeacher === chat.participantOne.idTeacher
                                                                    ? chat.participantTwo?.name
                                                                    : chat.participantOne?.name}
                                                            </span>
                                                            <div className="ml-1 text-xs text-slate-400">
                                                                <SortTime date={chat.lastMessageTime} />
                                                            </div>
                                                        </div>
                                                        <div className="mt-0.5 w-full truncate text-slate-500">{chat.lastMessage || <span className="text-xs text-slate-400">Iniciar a conversa primeiro</span>}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Content */}
                            <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
                                <div className="chat-box box h-[782px]">
                                    {selectedChatToken ? (
                                        <ChatRoom chatToken={selectedChatToken} />
                                    ) : (
                                        <div className="flex h-full w-full items-center">
                                            <div className="mx-auto text-center">
                                                <div className="image-fit mx-auto h-16 w-16 flex-none overflow-hidden rounded-full">
                                                    {user?.profile?.photo && user?.profile?.photo ? (
                                                        <img src={`${API_URL}/${user?.profile?.photo}`} alt="Img" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-400 text-white font-bold">
                                                            {user.profile.name?.slice(0, 1).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-3">
                                                    <div className="font-medium">
                                                        Olá, {user?.profile?.name || "User"}!
                                                    </div>
                                                    <div className="mt-1 text-slate-500">
                                                        Selecione uma conversa para iniciar o envio de mensagens.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center h-full ">
                        <div className="flex flex-col text-dark items-center">
                            <div className="bg-dark p-3 rounded-full mb-4 shadow-md transform transition duration-500 hover:rotate-12">
                                <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            </div>
                            <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
                                Parece que você ainda não tem conversas!
                            </h2>
                            <p className="text-lg font-medium max-w-md mb-6 tracking-wide opacity-90">
                                Inicie uma nova conversa com seus amigos e mantenha-se conectado.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
