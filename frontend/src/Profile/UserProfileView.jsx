import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../Config/contexts/context";
import SortTime from "../Components/Other/Other";
import { profileView, addORdeleteFriend, createChat } from "../Config/api/deviceAPI";
import { API_URL } from "../Config/api";
import { toast } from "react-toastify";
export default function UserProfileView() {
    const { user } = useContext(Context);
    const { idTeacher } = useParams();
    const [userData, setUserData] = useState('');
    const [error, setError] = useState('');
    const idTeacherNum = parseInt(idTeacher, 10);

    const [friendData, setFriendData] = useState({
        idTeacher: user?.profile?.idTeacher,
        idFriend: idTeacherNum
    });

    const handleFriendToggle = async () => {
        try {
            const response = await addORdeleteFriend(friendData);
            if (response.success) {
                toast.success(<p className="font-bold">Adicionou-o com sucesso como amigo!</p>);
                setTimeout(() => { window.location.reload() }, 2000);
            } else {
                toast.success(<p className="font-bold">Removido сom sucesso da sua lista de amigos!</p>);
                setTimeout(() => { window.location.reload() }, 2000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChat = async () => {
        try {
            const participants = {
                idParticipantOne: user?.profile?.idTeacher,
                idParticipantTwo: idTeacherNum
            };
            console.log(participants)
            const response = await createChat(participants);
            
            if (response.success) {
                toast.success("Chat criado ou aberto com sucesso!");
                window.location.href = `/chat/${idTeacherNum}`;
            }
        } catch (err) {
            console.error("Erro ao abrir uma sala de conversação:", err);
            toast.error("Falha ao criar uma sala de conversação.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await profileView(idTeacher);
                setUserData(data);
            } catch (err) {
                console.log(err);
                setError(err.response.data.Message);
            }
        };
        fetchData();
    }, []);

    const groupNames = userData?.profile?.user_groups?.map(group => group?.groups?.nameGroup);
    const schoolNames = userData?.profile?.user_schools?.map(school => school?.schools?.nameSchool);
    const isFriend = user?.profile?.friends?.some(item => item?.idFriend === idTeacherNum);

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y mt-8 flex items-center">
                    <h2 className="mr-auto text-lg font-medium">Informações sobre {userData?.profile?.name || 'Fantasma'}</h2>
                </div>

                <span className="text-danger">{error}</span>
                <div className="mt-5 grid grid-cols-12 gap-6">
                    <div className="col-span-12 flex flex-col-reverse lg:col-span-4 lg:block 2xl:col-span-3">
                        <div className="intro-y box mt-5 lg:mt-0">
                            <div className="relative flex items-center p-5">
                                <div className="image-fit h-12 w-12">
                                    <button className="bg-gray-400/80 text-white h-12 w-12 scale-110 font-bold overflow-hidden rounded-full" >
                                        {userData?.profile?.avatarUrl ? (
                                            <img src={userData?.profile?.avatarUrl} alt="Img" />
                                        ) : (
                                            <div className="rounded-full-black">{userData?.profile?.name?.slice(0, 1).toUpperCase()}</div>
                                        )}
                                    </button>
                                </div>
                                <div className="ml-4 mr-auto">
                                    <div className="text-base font-medium">{userData?.profile?.name || 'Fantasma'}</div>
                                    <div className="text-xs text-slate">{userData?.profile?.role === "utilizador" ? "Pessoal" : "Administrador"}</div>
                                </div>
                            </div>
                            {user?.profile?.idTeacher !== idTeacherNum && (
                                <div className="flex border-t border-slate-200/60 p-5 dark:border-darkmode-400">
                                    <div className="flex w-full gap-2">
                                        <button onClick={handleFriendToggle} className="flex-1 transition duration-200 border shadow-sm py-2 flex items-center justify-center px-3 rounded-md font-medium border-primary text-primary">
                                            {isFriend ? "Não seguir" : "Seguir"}
                                        </button>
                                        <button onClick={handleChat} className="flex-1 transition duration-200 border shadow-sm py-2 flex items-center justify-center px-3 rounded-md font-medium text-white bg-primary">
                                            Mensagem
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="intro-y box mt-5">
                            <div className="flex items-center px-5 p-5 py-3 dark:border-darkmode-400">
                                <h2 className="mr-auto text-base font-medium">Informações de contacto</h2>
                            </div>
                            <div className="border-t border-slate-200/60 p-5 dark:border-darkmode-400">
                                <p className="flex items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase-business"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg></span>
                                    <span className="ml-2">{groupNames?.join(', ') || '???'}</span>
                                </p>
                                <p className="mt-5 flex items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-school"><path d="M14 22v-4a2 2 0 1 0-4 0v4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M18 5v17" /><path d="m4 6 8-4 8 4" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg></span>
                                    <span className="ml-2">{schoolNames?.join(', ') || '???'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="intro-y box mt-5">
                            <div className="flex items-center border-b border-slate-200/60 px-5 p-5 py-3 dark:border-darkmode-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                <h2 className="mr-auto text-base font-medium ml-2">Amigos</h2>
                            </div>
                            {userData?.profile?.friends?.length > 0 ? (
                                userData?.profile?.friends?.map((item, index) => (
                                    <Link to={`/user-profile-view/${item?.friend?.idTeacher}`} key={index} className="cursor-pointer relative flex items-center p-3 hover:bg-slate-200/60">
                                        <div className="image-fit h-8 w-8">
                                            <button className="bg-gray-400/80 text-white h-8 w-8 scale-110 font-bold overflow-hidden rounded-full">
                                                {item?.friend?.photo ? (<img src={`${API_URL}api/${item?.friend?.photo}`} alt="Img Amigo" className="h-8 w-8 object-cover rounded-full" />) : (<div className="rounded-full-black"> {item?.friend?.name?.slice(0, 1).toUpperCase()}</div>)}
                                            </button>
                                        </div>
                                        <div className="ml-2 overflow-hidden">
                                            <div className="flex items-center">
                                                <a className="mr-5 truncate font-medium" href="">
                                                    {item?.friend?.name}
                                                </a>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (<div className="p-5 text-center">À procura de novos amigos 😊</div>)}
                        </div>


                    </div>
                    {/* END: Profile Menu */}
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        <div className="grid grid-cols-12 gap-6">

                            {/* BEGIN: Announcement */}
                            <div className="intro-y box col-span-12 2xl:col-span-auto overflow-y-auto" style={{ maxHeight: '720px' }}>
                                <div className="flex items-center border-b border-slate-200/60 px-5 p-5 py-3 dark:border-darkmode-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>
                                    <h2 className="mr-auto text-base font-medium ml-2">Atividade(s)</h2>
                                </div>
                                {userData?.activity?.length ? (
                                    userData?.activity?.map((activity) => (
                                        <div className="tiny-slider py-5" key={activity.idActivity}>
                                            <div className="px-5">
                                                <div className="flex items-center">
                                                    <div className="text-lg font-medium"> {activity.title} </div>
                                                    <div className="ml-auto text-xs text-slate-500">
                                                        <SortTime date={activity.publishDate} />
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-slate-600 dark:text-slate-500">{activity.description}</div>
                                                <div className="flex items-center">
                                                    <div className="flex mb-0 item-center">
                                                        {activity.activity_subjects?.map((subjectItem, subjectIndex) => (
                                                            <p className="text-xs block font-bold text-success mr-1" key={subjectIndex}>{subjectItem.subjects?.nameSubject}</p>
                                                        ))}

                                                        {activity.activity_educations?.map((educationItem, educationIndex) => (
                                                            <p className="text-xs block font-bold text-warning mr-1" key={educationIndex}>{educationItem.educations?.nameEducation}</p>
                                                        ))}

                                                        {activity.activity_years?.map((yearItem, yearIndex) => (
                                                            <p className="text-xs block font-bold text-primary mr-1" key={yearIndex}>{yearItem.years?.year}</p>
                                                        ))}
                                                    </div>
                                                    <Link to={`/view-activity/${activity.idActivity}`} className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20 [&:hover:not(:disabled)]:dark:bg-darkmode-100/10 ml-auto">
                                                        Ver detalhes
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-9 text-center" >
                                        <p><span className="mr-auto text-base font-medium">Parece que ainda não tem atividades publicadas.</span>
                                            <br />O {userData?.profile?.name || 'Quem?'} ainda não adicionou nada!</p>
                                        <br /><Link to='/add-post' className="text-primary font-medium">Adicionar publicação</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}