import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { chatRoom } from "../../Config/api/deviceAPI";
import { API_URL } from "../../Config/api";
import { io } from 'socket.io-client';

const socket = io({ API_URL });

export const getTimeAgo = (date) => {
    const now = new Date();
    const publishDate = new Date(date);

    const seconds = Math.floor((now - publishDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} segundo(s) atrás`;
    } else if (minutes < 60) {
        return `${minutes} minuto(s) atrás`;
    } else if (hours < 24) {
        return `${hours} hora(s) atrás`;
    } else if (days < 7) {
        return `${days} dia(s) atrás`;
    } else if (weeks < 5) {
        return `${weeks} semana(s) atrás`;
    } else if (months < 12) {
        return `${months} mês(es) atrás`;
    } else {
        return `${years} ano(s) atrás`;
    }
};

const SortTime = ({ date }) => {
    return (
        <span>{getTimeAgo(date)}</span>
    );
};

export default SortTime;

export const ServerError = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/');
    };

    const handleImmunity = () => {
        const tenMinutesFromNow = new Date(new Date().getTime() + 10 * 60000).toISOString();
        Cookies.set('immunity', 'true', { expires: new Date(tenMinutesFromNow) });
        alert('Imunidade ativada! Você pode navegar pelo site sem problemas por 10 minutos.');
    };

    return (
        <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
            <div className="flex items-center justify-center p-9">
                <div className="text-center p-6">
                    <h1 className="text-2xl text-red-500 mb-4">Sem resposta do servidor</h1>
                    <p className="mb-4">Parece que não conseguimos conectar ao servidor. Verifique sua conexão e tente novamente mais tarde.</p>
                    <details className="mb-4">
                        <summary className="cursor-pointer">Algumas soluções para este problema</summary>
                        <span className="font-bold">1. Recarregar a aplicação ou a página</span> - pode ajudar a refrescar a ligação. <br />
                        <span className="font-bold">2. Verifique a ligação à Internet</span> - assegure-se de que está conectado à Internet. <br />
                        <span className="font-bold">3. Verifique as configurações do firewall</span> — elas podem estar a bloquear o acesso. <br />
                        <span className="font-extrabold">4. O servidor pode estar indisponível</span> - tente aceder mais tarde.
                    </details>
                    <button
                        onClick={handleRetry}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Tentar novamente
                    </button>
                    <p className="mt-4">Os nossos contactos: <span className="font-medium">predinc01@gmail.com</span><br /><span className="text-xs">SupportPRED 2024™</span></p>
                    <a
                        role="button"
                        onClick={handleImmunity}
                        className="mt-2 text-green-500 text-xs  hover:text-green-600 transition">
                        Pré-visualização do site
                    </a>
                </div>
            </div>
        </div>
    );
};

export const FormatFileSize = ({ bytes }) => {
    if (bytes === 0) return <span>0 Bytes</span>;

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(2);

    return <span>{`${size} ${sizes[i]}`}</span>;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const getPaginationNumbers = () => {
        const paginationNumbers = [];

        if (totalPages <= 3) {
            return pageNumbers;
        }

        if (currentPage === 1) {
            paginationNumbers.push(1, 2, 3);
        } else if (currentPage === totalPages) {
            paginationNumbers.push(totalPages - 2, totalPages - 1, totalPages);
        } else {
            paginationNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        }

        return paginationNumbers;
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <div className="flex justify-center items-center mt-4">
            <ul className="inline-flex space-x-1">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`border border-gray-100 p-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-300'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                </li>
                {paginationNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`border border-gray-100 px-3 py-1 pt-2 rounded-md ${currentPage === number ? 'bg-white text-dark' : 'hover:bg-gray-300'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`border border-gray-100 p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-300'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export const ChatRoom = ({ userId, friendId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Получение старых сообщений при загрузке компонента
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await chatRoom(userId, friendId);
                setMessages(response.data); // Убедитесь, что `response.data` содержит сообщения
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, [userId, friendId]);

    // Настройка прослушивания новых сообщений через socket
    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage'); // Чистим событие при размонтировании
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            const messageData = { senderId: userId, receiverId: friendId, content: message };
            socket.emit('sendMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]); // Отображаем отправленное сообщение локально
            setMessage('');
        }
    };

    return (
        <>
            <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5">
                <div className="float-left mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                    <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">
                        {/* <img
                                                className="rounded-full"
                                                src="dist/images/fakers/profile-6.jpg"
                                                alt="#"
                                            /> */}
                    </div>
                    <div className="rounded-r-md rounded-t-md bg-slate-100 px-4 py-3 text-slate-500 dark:bg-darkmode-400">
                        asd{/* <ChatRoom userId={user?.profile?.idTeacher} friendId={2} /> */}
                        <div className="mt-1 text-xs text-slate-500">._time</div>
                    </div>

                </div>

                {messages.map((msg, index) => (
                    <>
                        <div className="clear-both" />
                        <div key={index} className="float-right mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                            <div className="rounded-l-md rounded-t-md bg-primary px-4 py-3 text-white">
                                <strong>{msg.senderId === userId ? 'You' : 'Friend'}</strong>: {msg.content}
                                <div className="mt-1 text-xs text-white text-opacity-80">
                                    _.time
                                </div>
                            </div>

                            <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">

                            </div>
                        </div>
                    </>
                ))}
                <div className="clear-both" />
            </div>
            <div className="flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                <textarea
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva a sua mensagem..."
                    className="border-t border-slate-200/60 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm rounded-md placeholder:text-slate-400/90 focus:ring-primary focus:ring-opacity-20 focus:border-opacity-40 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 h-[46px] resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600"
                />
                <div class="relative mr-3 h-4 w-4 text-slate-500 sm:mr-5 sm:h-5 sm:w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                    <input data-tw-merge="" type="file" class="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 absolute left-0 top-0 h-full opacity-0" />
                </div>

                <a onClick={sendMessage} class="mr-5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-10 sm:w-10" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                </a>
            </div>
        </>
    );
};