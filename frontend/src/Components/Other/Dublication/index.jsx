import React, { useEffect, useState, useCallback, useContext } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { activity, activityView, getGroupsSchools, getSubjectsEducationsAndYears, deleteEntity, addCommentary } from "../../../Config/api/deviceAPI";
import SortTime, { FormatFileSize, Pagination } from "../Other";
import Select from 'react-select';
import { Context } from "../../../Config/contexts/context";
import { toast } from 'react-toastify';
import { DropzoneComponent } from "../../DropzoneComponent";

import { API_URL } from "../../../Config/api";

export const ActivityListForForm = ({ limit }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await activity();
                const sortedData = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
                setActivities(sortedData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div class="col-span-12 mt-8">
                {activities.length > 0 ? (
                    <div class="mt-5 grid grid-cols-12 gap-6">
                        {activities.slice(0, limit).map((activity, index) => (
                            <Link to={`/view-activity/${activity.idActivity}`} className="intro-y col-span-12 sm:col-span-6 xl:col-span-3" key={index}>
                                <div className="relative zoom-in before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']">
                                    <div className="box p-5">
                                        <div className="mt-0 text-3xl font-medium leading-8">{activity.title}</div>
                                        <div className="mt-1 text-base text-slate-500">
                                            {activity.description.length > 120 ? activity.description.slice(0, 120) + '...' : activity.description}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mt-1 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                                                <span>Novo</span>
                                                {/* <span><SortTime date={activity.publishDate} /></span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 rounded-2xl shadow-2xl transform transition duration-300">
                        <div className="flex flex-col text-dark items-center">
                            <div className="bg-dark p-3 rounded-full mb-4 shadow-md transform transition duration-500 hover:rotate-12">
                                <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
                            </div>
                            <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
                                Atividades não encontradas
                            </h2>
                            <p className="text-lg font-medium max-w-md mb-6 tracking-wide opacity-90">
                                Por enquanto, está vazio. Seja o primeiro, adicione atividade e inspire outros!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export const ActivityList = () => {
    const { user } = useContext(Context);
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await activity();
                const sortedData = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
                setActivities(sortedData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    const filteredActivities = activities.filter(activity => {
        const term = searchTerm.toLowerCase();
        return (
            activity.title.toLowerCase().includes(term) ||
            activity.activity_subjects?.some(subjectObj => subjectObj.subjects?.nameSubject.toLowerCase().includes(term)) ||
            activity.activity_educations?.some(educationObj => educationObj.educations?.nameEducation.toLowerCase().includes(term)) ||
            activity.activity_years?.some(yearObj => yearObj.years?.year.toString().includes(term))
        );
    });

    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <h2 className="intro-y mt-9 text-lg font-medium">Ver - Actividades</h2>
            <div className="intro-y col-span-12 mt-2 flex flex-wrap items-center sm:flex-nowrap">
                <Link
                    to="/add-post"
                    className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md"
                >
                    Adicionar publicação
                </Link>
                <div className="mx-auto hidden text-slate-500 md:block">
                    Mostrando 1 a 10 de {activities.length} entradas
                </div>
                <div className="mt-3 w-full sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
                    <div className="relative w-56 text-slate-500" title="Pesquisa por título, disciplina, nível ou ano...">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="disabled:bg-slate-100 disabled:cursor-not-allowed [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 w-56 pr-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /></svg>
                    </div>
                </div>
            </div>

            {currentActivities.length > 0 ? (
                currentActivities.map((activity, index) => (
                    <div className="mt-5" key={index}>
                        <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                            <div className="flex items-center">
                                <div className="before:absolute before:ml-5 before:mt-5 before:block before:h-px before:w-20 before:bg-gray-400 before:dark:bg-darkmode-400">
                                    <button className="bg-gray-400 font-bold text-white image-fit cursor-pointer zoom-in h-10 w-10 flex-none overflow-hidden rounded-full">
                                        <span className="rounded-full-black" title={activity.users.name}>
                                            <Link to={activity.users.idTeacher === user.profile.idTeacher ? (`/user-profile`) : (`/user-profile-view/${activity.users.idTeacher}`)}>{activity?.users?.photo ? (<img src={`${API_URL}/${activity?.users?.photo}`} alt="Img Amigo" className="h-10 w-10 object-cover rounded-full" />) : (<div className="rounded-full-black"> {activity?.users?.name?.slice(0, 1).toUpperCase()}</div>)}</Link>
                                        </span>
                                    </button>
                                    <div className="items-center mt-1">
                                        <FavoritesComponent activityId={activity.idActivity} />
                                    </div>
                                </div>
                                <Link to={`/view-activity/${activity.idActivity}`} className="box zoom-in ml-4 flex-1 px-5 py-3">
                                    <div className="flex items-center">
                                        <div className="font-medium"> {activity.title} </div>
                                        <div className="ml-auto text-xs text-slate-500">
                                            <SortTime date={activity.publishDate} />
                                        </div>
                                    </div>
                                    <div className="mt-1 text-slate-500">
                                        {activity.description.slice(0, 301) + '...'}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="mr-4">
                                            {activity.activity_files && activity.activity_files.length > 0 ? (
                                                <div className="text-xs text-slate-500 mt-4">
                                                    <span>Ficheiro(s): {activity.activity_files.length}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-500 mb-1">Não há ficheiros anexados</span>
                                            )}
                                        </div>
                                        <div className="flex mt-5 item-center">
                                            {activity.activity_subjects?.map((subjectObj, subjectIndex) => (
                                                <span className="text-xs block font-bold text-success mr-1" key={subjectIndex}>
                                                    {subjectObj.subjects?.nameSubject}
                                                    {subjectIndex < activity.activity_subjects.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                            {activity.activity_educations?.map((educationObj, educationIndex) => (
                                                <span className="text-xs block font-bold text-warning mr-1" key={educationIndex}>
                                                    {educationObj.educations?.nameEducation}
                                                    {educationIndex < activity.activity_educations.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                            {activity.activity_years?.map((yearObj, yearIndex) => (
                                                <span className="text-xs block font-bold text-primary mb-1" key={yearIndex}>
                                                    {yearObj.years?.year}
                                                    {yearIndex < activity.activity_years.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center p-12 rounded-2xl shadow-2xl transform transition duration-300">
                    <div className="flex flex-col text-dark items-center">
                        <div className="bg-dark p-3 rounded-full mb-4 shadow-md transform transition duration-500 hover:rotate-12">
                            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
                        </div>
                        <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
                            Atividades não encontradas
                        </h2>
                        <p className="text-lg font-medium max-w-md mb-6 tracking-wide opacity-90">
                            Por enquanto, está vazio. Seja o primeiro, adicione atividade e inspire outros!
                        </p>
                    </div>
                </div>
            )}
            {currentActivities.length > 0 ? (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredActivities.length / activitiesPerPage)}
                    onPageChange={paginate}
                />
            ) : (null)}
        </>
    );
};

export const ActivityView = ({ activityId }) => {
    const { user } = useContext(Context)
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await activityView(activityId);
                setActivity(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [activityId]);

    const activitySubjectsList = activity.activity_subjects?.map((item) => (item?.subjects?.nameSubject))
    const activityEducationsList = activity.activity_educations?.map((item) => (item?.educations?.nameEducation))
    const activityYearsList = activity.activity_years?.map((item) => (item?.years?.year))

    return (
        <>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <div className="flex items-center border-b border-slate-200/60 px-5 py-4 dark:border-darkmode-400">
                    <div className="image-fit h-10 w-10 flex-none">
                        <button className="bg-gray-400/80 text-white h-10 w-10 scale-110 font-bold overflow-hidden rounded-full " >
                            {activity?.users?.photo ? (<img src={`${API_URL}/${activity?.users?.photo}`} alt="Img Amigo" className="h-10 w-10 object-cover rounded-full" />) : (<div className="rounded-full-black"> {activity?.users?.name?.slice(0, 1).toUpperCase()}</div>)}
                        </button>
                    </div>
                    <div className="ml-3 mr-auto truncate">
                        <a className="font-medium truncate" title={activity?.users?.name}>
                            {activity?.users?.name}
                        </a>
                        <div className="mt-0.5 flex items-center text-xs text-slate-500 truncate">
                            <a className="inline-block truncate text-primary overflow-hidden" href="">
                                <span className="font-bold text-success truncate" title="Disciplina">
                                    {activitySubjectsList?.join(', ')}
                                </span>
                                {activitySubjectsList?.length > 0 ? (
                                    <span className="mx-1">•</span>
                                ) : (
                                    'Tópico: Geral'
                                )}
                                <span className="font-bold text-warning truncate" title="Nível">
                                    {activityEducationsList?.join(', ')}
                                </span>
                                {activityEducationsList?.length > 0 ? (
                                    <span className="mx-1">•</span>
                                ) : null}
                                <span className="font-extrabold text-primary truncate" title="Ano">
                                    {activityYearsList?.join(', ')}
                                </span>
                            </a>
                            <SortTime date={activity.publishDate} />
                        </div>
                    </div>

                    <div className="dropdown relative mr-3">
                        <button className="cursor-pointer h-5 w-5 text-slate-500">
                            {activity?.users?.idTeacher === user?.profile?.idTeacher || user?.profile?.role === 'administrador'
                                ? <DeleteEditComponent entityType='activity' entityId={activityId} activity={activity} />
                                : null}
                        </button>
                        <div className="dropdown-menu absolute z-[9999] hidden">
                            <div className="dropdown-content rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600 w-40">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <a className="block text-base font-medium" href="">{activity.title}</a>
                    <div className="mt-2 text-slate-600 dark:text-slate-500">{activity.description}</div>
                </div>

                <div className="flex flex-wrap text-justify indent-[5px] leading-relaxed p-2 overflow-x-auto">
                    {activity?.activity_files && activity?.activity_files.length > 0 ? (
                        activity.activity_files.slice(0, 4).map((file, fileIndex) => (
                            <React.Fragment key={fileIndex}>
                                <div className="w-full sm:w-1/5 p-2">
                                    <div className="file box zoom-in">
                                        <div className="relative rounded-md p-3 bg-white shadow">
                                            <div className="flex justify-center mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                                                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                </svg>
                                            </div>
                                            <div className="mb-3">
                                                <p className="mt-1 block truncate font-medium text-left m-0" title={file.fileName}>
                                                    {file.fileName.slice(0, 12)}{file.fileName.length > 12 && '...'}
                                                </p>
                                                <div className="mt-0 text-xs text-slate-500 text-left m-0">
                                                    <FormatFileSize bytes={file.fileSize} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {fileIndex === 3 && activity.activity_files.length > 4 && (
                                    <div className="w-full sm:w-1/5 p-2" key="extra-files">
                                        <div className="file box zoom-in">
                                            <div className="relative rounded-md p-3 bg-white shadow">
                                                <div className="flex justify-center mb-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                    </svg>
                                                </div>
                                                <div className="mb-3">
                                                    <p className="mt-1 block truncate font-medium text-left m-0">
                                                        E mais {activity.activity_files.length - 4} ficheiros
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    ) : null}
                </div>




                <div className="flex items-center border-t border-b border-slate-200/60 px-6 py-4 transition duration-300">
                    <a className="tooltip cursor-pointer intro-x mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-slate-200 shadow">
                        <FavoritesComponent activityId={activity.idActivity} />
                    </a>
                    {activity?.planning?.length > 0 ? (
                        <Link to={activity.planning} className="tooltip font-medium cursor-pointer intro-x ml-auto flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-all duration-300 shadow">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" />
                            </svg>
                            Planificação
                        </Link>
                    ) : <div className="tooltip ml-auto flex items-center" />}

                    {activity?.presentation?.length > 0 ? (
                        <Link to={activity.presentation} className="tooltip font-medium cursor-pointer intro-x ml-3 flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-all duration-300 shadow">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" />
                            </svg>
                            Apresentação
                        </Link>
                    ) : null}

                    <FileDownloadComponent activity={activity} />

                </div>

            </div>

        </>
    )
}

export const Commentary = ({ activityId }) => {
    const { user } = useContext(Context);
    const [activity, setActivity] = useState([]);
    const [sendMessage, setSendMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await activityView(activityId);
                setActivity(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [activityId]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!sendMessage.trim()) {
            return toast.error(<p className="font-bold">Um comentário não pode estar vazio.</p>);
        }

        const submissionData = {
            idTeacher: user?.profile?.idTeacher,
            idActivity: activityId,
            message: sendMessage,
        };

        try {
            const response = await addCommentary(submissionData);
            if (response && response.success) {
                toast.success(<p className="font-bold">Comentário adicionado com sucesso!</p>);

                setSendMessage('');

                const updatedActivity = await activityView(activityId);
                setActivity(updatedActivity);
            } else {
                toast.error(<p className="font-bold">Erro ao adicionar um comentário.<span>Tente novamente.</span></p>);
            }
        } catch (err) {
            console.error(err);
            toast.error(<p className="font-bold">Ocorreu um erro ao publicar um comentário.</p>);
        }
    };

    return (
        <div className="px-5">
            <div className="intro-y">
                <div className="pt-5 pb-5">
                    <div className="flex w-full items-center">
                        <div className="flex items-center justify-center bg-gray-400 text-white font-bold w-8 h-8 mr-2 rounded-full">
                            {user?.profile?.avatarUrl && user?.profile?.avatarUrl.trim() ? (
                                <img className="rounded-full" src={user.profile.avatarUrl} alt="Img" />
                            ) : (
                                <div className="rounded-full-black">
                                    {user.profile.name?.slice(0, 1).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex w-full items-center">
                            <input
                                type="text"
                                placeholder="Publicar um comentário..."
                                value={sendMessage}
                                onChange={(e) => setSendMessage(e.target.value)}
                                className="transition w-full duration-200 text-sm shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 rounded-full border-transparent bg-slate-100 pr-10"
                            />
                            <button onClick={handleSave} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                    <path d="m21.854 2.147-10.94 10.939" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {activity?.activity_commentaries?.map((comment, index) => (
                <div key={index} className="intro-y border-t pb-10">
                    <div className="pt-5">
                        <div className="flex">
                            <div className="image-fit h-10 w-10 flex-none sm:h-12 sm:w-12">
                                <Link className="flex items-center justify-center bg-gray-400 text-white font-bold w-11 h-11 rounded-full" to={comment?.user?.idTeacher === user?.profile?.idTeacher ? (`/user-profile`) : (`/user-profile-view/${comment?.user?.idTeacher}`)}>
                                    {comment?.user?.photo ? (
                                        <img src={`${API_URL}/${comment?.user?.photo}`} alt="Img Amigo" className="h-11 w-11 object-cover rounded-full" />
                                    ) : (
                                        <div className="rounded-full">
                                            {comment?.user?.name?.slice(0, 1).toUpperCase()}
                                        </div>
                                    )}
                                </Link>
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex items-center">
                                    <Link to={`/user-profile-view/${comment?.user?.idTeacher}`} className="font-medium">{comment?.user?.name}</Link>
                                </div>
                                <div className="text-xs text-slate-500 sm:text-sm">
                                    <SortTime date={comment?.publishDate} />
                                </div>
                                <div className="mt-2">{comment?.message}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export const GroupsSchools = ({ onChange, settingUser = false }) => {
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);

    const [formDataSchoolsGroups, setFormDataSchoolsGroups] = useState({
        selectedSchools: [],
        selectedGroups: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { schools, groups } = await getGroupsSchools();

                const formattedSchools = schools.map((school) => ({
                    value: school.idSchool,
                    label: school.nameSchool
                }));

                const formattedGroups = groups.map((group) => ({
                    value: group.idGroup,
                    label: group.nameGroup
                }));

                setSchoolOptions(formattedSchools);
                setGroupOptions(formattedGroups);
            } catch (err) {
                console.error("Error fetching groups and schools:", err);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (selectedOptions, field) => {
        setFormDataSchoolsGroups((prevData) => ({
            ...prevData,
            [field]: selectedOptions || []
        }));
        onChange({
            ...formDataSchoolsGroups,
            [field]: selectedOptions
        });
    };

    return (
        <>
            {settingUser === true ? 'Escolas' : null}
            <Select
                className="mt-4"
                placeholder="Selecione escolas"
                options={schoolOptions}
                isMulti
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedSchools')}
            />
            {settingUser === true ? <div className="mt-3">Groupos</div> : null}
            <Select
                className="mt-4"
                placeholder="Selecione grupos"
                options={groupOptions}
                isMulti
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedGroups')}
            />
        </>
    );
};

export const SubjectsEducationsYears = ({ onChange }) => {
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [educationOptions, setEducationOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [formDataSubjectsEducationsYears, setFormDataSubjectsEducationsYears] = useState({
        selectedSubjects: [],
        selectedEducations: [],
        selectedYears: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { subjects, educations, years } = await getSubjectsEducationsAndYears();

                const formattedSubjects = subjects.map((subject) => ({
                    value: subject.idSubject,
                    label: subject.nameSubject,
                }));

                const formattedEducations = educations.map((education) => ({
                    value: education.idEducation,
                    label: education.nameEducation,
                }));

                const formattedYears = years.map((year) => ({
                    value: year.idYear,
                    label: year.year,
                }));

                setSubjectOptions(formattedSubjects);
                setEducationOptions(formattedEducations);
                setYearOptions(formattedYears);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (selectedOptions, type) => {
        const updatedValues = selectedOptions ? selectedOptions.map(option => option) : [];
        setFormDataSubjectsEducationsYears((prevData) => ({
            ...prevData,
            [type]: updatedValues,
        }));

        onChange({
            ...formDataSubjectsEducationsYears,
            [type]: updatedValues,
        });
    };

    return (
        <div className="mt-4 w-full max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-between gap-4">
                <div className="flex-1 min-w-[200px]">
                    <Select
                        placeholder="Selecionar disciplinas"
                        className="text-gray-700"
                        classNamePrefix="react-select"
                        options={subjectOptions}
                        value={formDataSubjectsEducationsYears.selectedSubjects}
                        isMulti
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedSubjects')}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? '#3b82f6' : '#D1D5DB',
                                boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : '0 0 #D1D5DB',
                                borderRadius: '0.375rem',
                                transition: 'border-color 0.2s ease-in-out',
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#E5E7EB',
                            }),
                            multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#111827',
                            }),
                        }}
                    />
                </div>

                <div className="flex-1 min-w-[200px]">
                    <Select
                        placeholder="Selecionar níveis"
                        className="text-gray-700"
                        classNamePrefix="react-select"
                        options={educationOptions}
                        value={formDataSubjectsEducationsYears.selectedEducations}
                        isMulti
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedEducations')}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? '#3b82f6' : '#D1D5DB',
                                boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
                                borderRadius: '0.375rem',
                                transition: 'border-color 0.2s ease-in-out',
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#E5E7EB',
                            }),
                            multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#111827',
                            }),
                        }}
                    />
                </div>

                <div className="flex-1 min-w-[200px]">
                    <Select
                        placeholder="Selecionar anos"
                        className="text-gray-700"
                        classNamePrefix="react-select"
                        options={yearOptions}
                        value={formDataSubjectsEducationsYears.selectedYears}
                        isMulti
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedYears')}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? '#3b82f6' : '#D1D5DB',
                                boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
                                borderRadius: '0.375rem',
                                transition: 'border-color 0.2s ease-in-out',
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#E5E7EB',
                            }),
                            multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#111827',
                            }),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export const ActivityEditor = ({ activity, onClose }) => {
    const [formData, setFormData] = useState({
        title: activity?.title || '',
        description: activity?.description || '',
        planning: activity?.planning || '',
        presentation: activity?.presentation || '',
        selectedSubjects: activity?.activity_subjects || [],
        selectedEducations: activity?.activity_educations || [],
        selectedYears: activity?.activity_years || [],
        files: activity?.activity_files || [],
    });

    const handleSubjectsEducationsYearsChange = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedSubjects: Array.from(new Set([...prevData.selectedSubjects, ...(data.selectedSubjects || [])])),
            selectedEducations: Array.from(new Set([...prevData.selectedEducations, ...(data.selectedEducations || [])])),
            selectedYears: Array.from(new Set([...prevData.selectedYears, ...(data.selectedYears || [])])),
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            toast.error(<p className="font-bold">Por favor!<br /><span className='text-xs text-slate-400'>Preencha todos os campos obrigatórios.</span></p>);
            return;
        }

        const submissionData = {
            title: formData.title,
            description: formData.description,
            planning: formData.planning,
            presentation: formData.presentation,
            subjects: formData.selectedSubjects,
            educations: formData.selectedEducations,
            years: formData.selectedYears,
            files: formData.files,
        };

        console.log("SubmitformDData", submissionData);
        try {
            const response = await addActivity(submissionData);
            if (response && response.success) {
                toast.success(<p className="font-bold">Atividade adicionada com sucesso!</p>);
                onClose();
            } else {
                toast.error(<p className="font-bold">Erro ao adicionar atividade. Tente novamente.</p>);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileDelete = (fileName) => {
        setFormData((prevData) => ({
            ...prevData,
            files: prevData.files.filter(file => file.name !== fileName),
        }));
        toast.success(`Ficheiro "${fileName}" removido com sucesso.`);
    };

    const handleFileChange = (newFiles) => {
        setFormData((prevData) => ({
            ...prevData,
            files: [...prevData.files, ...newFiles.filter(newFile => 
                !prevData.files.some(file => file.name === newFile.name))],
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center rounded-[1.3rem] bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-6xl p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Editar Atividade</h2>
                <form onSubmit={handleSave}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            placeholder="Nome do Título"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            placeholder="Digite os seus comentários"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="mt-1 h-52 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Planning</label>
                            <input
                                type="text"
                                placeholder="Link para o seu plano de aula"
                                value={formData.planning}
                                onChange={(e) => setFormData({ ...formData, planning: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apresentação</label>
                            <input
                                type="text"
                                placeholder="Link para a sua apresentação"
                                value={formData.presentation}
                                onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                    </div>

                    <SubjectsEducationsYears onChange={handleSubjectsEducationsYearsChange} />

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Ficheiros</label>
                        <div className="justify-center items-center flex">
                            <DropzoneComponent onFileChange={handleFileChange} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="block text-sm font-normal text-gray-700">Ficheiros existentes</label>
                            {formData.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-600">{file.fileName || file.name}{file.name ? <span className="ml-3 text-white text-xs rounded p-1 bg-gray-400">Novo</span> : null}</span>
                                    <button
                                        onClick={() => handleFileDelete(file.name)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const DeleteEditComponent = ({ entityType, entityId, activity }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setConfirmDeleteVisible(false);
    };

    const handleEdit = () => {
        setMenuVisible(false);
        setEditMode(true);
    };

    const handleDeleteClick = () => {
        setConfirmDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteEntity(entityType, entityId);
            if (onEditComplete) onEditComplete();
        } catch (err) {
            console.error(err, 'Type:', entityType, 'Id:', entityId);
        }
        setConfirmDeleteVisible(false);
        setMenuVisible(false);
    };

    const cancelDelete = () => {
        setConfirmDeleteVisible(false);
        setMenuVisible(false);
    };

    const handleSave = async (updatedActivity) => {
        // Your update API call here
        await updateActivity(entityId, updatedActivity);
    };


    return (
        <>
            <button onClick={toggleMenu} className="transition duration-200 border shadow-sm inline-flex items-center justify-center h-10 w-10 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-secondary/70 border-secondary/70 text-slate-500 dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300 [&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100 [&:hover:not(:disabled)]:dark:border-darkmode-300/80 [&:hover:not(:disabled)]:dark:bg-darkmode-300/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-vertical cursor-pointer"> <circle cx="12" cy="5" r="1" /> <circle cx="12" cy="12" r="1" /> <circle cx="12" cy="19" r="1" /> </svg>
            </button>

            <div className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-100 shadow-lg bg-white p-2 transform transition-all duration-300 ease-in-out
                    ${menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <a onClick={handleEdit} className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"> <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" /></svg>
                    <span className="ml-2">Editar</span>
                </a>


                {!confirmDeleteVisible ? (
                    <a onClick={handleDeleteClick} className="cursor-pointer flex items-center text-danger p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"> <path d="M3 6h18" /> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /> <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" /></svg>
                        <span className="ml-2">Remover</span>
                    </a>
                ) : (
                    <div className="p-2 rounded-md bg-gray-50 dark:bg-darkmode-600">
                        <div className="text-xs text-center text-gray-600 dark:text-gray-300 mb-2">Tem a certeza que pretende remover?</div>
                        <div className="flex justify-center space-x-2">
                            <button onClick={cancelDelete} className="py-1 px-3 rounded-md bg-gray-300 hover:bg-gray-400 text-sm">Cancelar</button>
                            <button onClick={confirmDelete} className="py-1 px-3 rounded-md bg-danger text-white hover:bg-danger-dark text-sm">Confirmar</button>
                        </div>
                    </div>
                )}
            </div>
            {editMode && (
                <ActivityEditor
                    activity={activity}
                    onSave={handleSave}
                    onClose={() => setEditMode(false)}
                />
            )}
        </>
    )
}

export const FavoritesComponent = ({ activityId }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favsFromCookie = Cookies.get('activityFavorites');
        if (favsFromCookie) {
            setFavorites(favsFromCookie.split(',').map(Number));
        }
    }, []);

    const toggleFavorite = useCallback((id) => {
        setFavorites(prevFavorites => {
            const updatedFavorites = prevFavorites.includes(id)
                ? prevFavorites.filter(favId => favId !== id)
                : [...prevFavorites, id];

            Cookies.set('activityFavorites', updatedFavorites.join(','), { expires: 365 });

            toast.success(updatedFavorites.includes(id)
                ? <p className="font-bold">Guardado com sucesso! <br /> <span className="text-xs text-slate-400">Pode encontrar os favoritos no seu perfil.</span> </p>
                : <p className="font-bold">Removido com sucesso!</p>
            );

            return updatedFavorites;
        });
    }, []);

    const isFavorite = favorites.includes(activityId);


    return (
        <>
            <div className="flex items-center justify-center">
                <svg onClick={() => toggleFavorite(activityId)} title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} className={`items-center justify-center cursor-pointer ${isFavorite ? 'text-yellow-500' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /> </svg>

                {/* <svg title="Share" className="ml-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /> </svg> */}
            </div>
        </>
    );
};

export const FileDownloadComponent = ({ activity }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            {activity?.activity_files && activity.activity_files.length > 0 ? (
                activity.activity_files.length === 1 ? (
                    <a
                        href={`${API_URL}/${activity.activity_files[0].filePath}`}
                        download={activity.activity_files[0].fileName}
                        className="tooltip font-medium cursor-pointer intro-x ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 hover:bg-opacity-90"
                        title={activity.activity_files[0].fileName}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                    </a>
                ) : (
                    <div className="relative inline-block text-left">
                        <button
                            onClick={toggleDropdown}
                            className="tooltip font-medium cursor-pointer intro-x ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 hover:bg-opacity-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="p-2 dropdown-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                {activity.activity_files.map((file, fileIndex) => (
                                    <a
                                        key={fileIndex}
                                        href={`${API_URL}/${file.filePath}`}
                                        download={file.fileName}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        {file.fileName}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )
            ) : null}
        </div>
    );
}

