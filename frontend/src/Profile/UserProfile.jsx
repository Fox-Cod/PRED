import React, { useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Context } from "../Config/contexts/context";
import SortTime from "../Components/Other/Other"
import teamUpImage from '../assets/images/team-up.svg'
import { activity } from "../Config/api/deviceAPI";
import { API_URL } from "../Config/api";

export default function UserProfile() {
    const { user } = useContext(Context)
    const [favoritesActivity, setFavoritesActivity] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const savedFavorites = Cookies.get('activityFavorites');
        setFavoritesActivity((savedFavorites || "").split(',').map(Number));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await activity();
                setActivities(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const groupNames = user?.profile?.user_groups?.map(group => group.groups.nameGroup);
    const schoolNames = user?.profile?.user_schools?.map(school => school.schools.nameSchool);

    console.log(favoritesActivity)

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y mt-8 flex items-center">
                    <h2 className="mr-auto text-lg font-medium">Esquema do perfil</h2>
                </div>
                <div className="mt-5 grid grid-cols-12 gap-6">
                    {/* BEGIN: Profile Menu */}
                    <div className="col-span-12 flex flex-col-reverse lg:col-span-4 lg:block 2xl:col-span-3">
                        <div className="intro-y box mt-5 lg:mt-0">
                            <div className="relative flex items-center p-5">
                                <div className="image-fit h-12 w-12">
                                    <button className="bg-gray-400/80 text-white h-12 w-12 scale-110 font-bold overflow-hidden rounded-full " >
                                        {user?.profile?.avatarUrl && user?.profile?.avatarUrl.trim() ? (<img src={user.profile.avatarUrl} alt="Img" />) : (<div classNspaname="rounded-full-black">{user.profile.name?.slice(0, 1).toUpperCase()}</div>)}
                                    </button>
                                </div>

                                <div className="ml-4 mr-auto">
                                    <div className="text-base font-medium">{user.profile.name}</div>
                                    <div className="text-xs text-slate">{user.profile.role === "utilizador" ? "Pessoal" : "Administrador"}</div>
                                </div>
                            </div>
                            <div className="border-t border-slate-200/60 p-5 dark:border-darkmode-400">
                                <Link to="/user-profile-view" className="flex items-center font-medium text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                                    <span className="ml-2">Informação pessoal</span>
                                </Link>
                                <Link to="/update-profile" className="mt-5 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                    <span className="ml-2">Definições da conta</span>
                                </Link>
                            </div>
                        </div>



                        <div className="intro-y box mt-5">
                            <div className="flex items-center px-5 p-5 py-3 dark:border-darkmode-400">
                                <h2 className="mr-auto text-base font-medium">Informações de contacto</h2>
                            </div>
                            <div className="border-t border-slate-200/60 p-5 dark:border-darkmode-400">
                                <p className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    <span className="ml-2">{user.profile.email}</span>

                                </p>
                                <p className="mt-5 flex items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase-business"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg></span>
                                    <span className="ml-2">{groupNames?.join(', ')}</span>
                                </p>
                                <p className="mt-5 flex items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-school"><path d="M14 22v-4a2 2 0 1 0-4 0v4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M18 5v17" /><path d="m4 6 8-4 8 4" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg></span>
                                    <span className="ml-2">{schoolNames?.join(', ')}</span>
                                </p>
                            </div>

                        </div>
                    </div>
                    {/* END: Profile Menu */}
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        <div className="grid grid-cols-12 gap-6">

                            {/* BEGIN: Announcement */}
                            <div className="intro-y box col-span-12 2xl:col-span-auto overflow-y-auto" style={{ maxHeight: '484.5px' }}>
                                <div className="flex items-center border-b border-slate-200/60 px-5 p-5 py-3 dark:border-darkmode-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>
                                    <h2 className="mr-auto text-base font-medium ml-2">Sua atividade(s)</h2>
                                </div>
                                {user.activity.length ? (
                                    user.activity.map((activity) => (
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
                                            <br />Ficaríamos felizes em ver as suas ideias e projetos!</p>
                                        <br /><Link to='/add-post' className="text-primary font-medium">Adicionar publicação</Link>
                                    </div>
                                )}
                            </div>


                            <div className="intro-y col-span-6 box 2xl:col-span-auto max-h-96 overflow-y-auto">
                                <div className="flex items-center border-b border-slate-200/60 px-5 p-5 py-3 dark:border-darkmode-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                                    <h2 className="mr-auto text-base font-medium ml-2">Favorites</h2>
                                </div>

                                <div className="tiny-slider">
                                    <div className="p-5">
                                        {favoritesActivity.length > 0 ? (
                                            favoritesActivity.map(favId => {
                                                const activity = activities.find((act) => act.idActivity === favId);

                                                return activity ? (
                                                    <div key={favId}>
                                                        <Link to={`/view-activity/${activity.idActivity}`} className="truncate text-base font-medium">
                                                            {activity.title}
                                                        </Link>
                                                        <p className="mt-1 text-slate-400"></p>
                                                        <p className="mt-1 text-justify text-slate-500">{activity.description}</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="text-center">
                                                            <p>Ainda não adicionou atividades aos favoritos.</p>
                                                            <span>Para guardar nos favoritos, clique no ícone:</span>
                                                        </div>
                                                        <div className="flex mt-2 justify-center items-center">
                                                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                                                            </svg>
                                                        </div>
                                                    </>
                                                );
                                            })
                                        ) : (
                                            <div>Não há actividades selecionadas</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="intro-y col-span-6 box 2xl:col-span-auto max-h-96 overflow-y-auto">
                                <div className="flex items-center border-b border-slate-200/60 px-5 p-5 py-3 dark:border-darkmode-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    <h2 className="mr-auto text-base font-medium ml-2">Meu amigo(s)</h2>
                                </div>

                                {user?.profile?.friends?.map((item, index) => (
                                    <Link to={`/user-profile-view/${item?.friend?.idTeacher}`} key={index} className="cursor-pointer relative flex items-center p-3 hover:bg-slate-200/60" >
                                        <div className="image-fit h-8 w-8">
                                            <button className="bg-gray-400/80 text-white h-8 w-8 scale-110 font-bold overflow-hidden rounded-full " >
                                                {item?.friend?.photo ? (<img src={`${API_URL}/${item?.friend?.photo}`} alt="Img Amigo" className="h-8 w-8 object-cover rounded-full" />) : (<div className="rounded-full-black"> {item?.friend?.name?.slice(0, 1).toUpperCase()}</div>)}
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}