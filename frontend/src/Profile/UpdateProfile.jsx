import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Config/contexts/context";
import { profileUpdate, avatarUpdate } from "../Config/api/deviceAPI";
import { GroupsSchools } from "../Components/Other/Dublication";
import { toast } from 'react-toastify';

export default function UpdateProfile() {
    const { user } = useContext(Context);

    const userGroupsNames = user?.profile?.user_groups?.map(group => group.groups.nameGroup);
    const userSchoolNames = user?.profile?.user_schools?.map(school => school.schools.nameSchool);

    const groupNames = user?.profile?.user_groups?.map(group => ({
        value: group?.idGroup,
        label: group?.groups?.nameGroup
    }));

    const schoolNames = user?.profile?.user_schools?.map(school => ({
        value: school?.idSchool,
        label: school?.schools?.nameSchool
    }));

    const [formData, setFormData] = useState({
        name: user?.profile?.name || '',
        email: user?.profile?.email || '',
        selectedGroups: groupNames || [],
        selectedSchools: schoolNames || [],
    });
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user?.profile) {
            setFormData({
                name: user.profile.name || '',
                email: user.profile.email || '',
                selectedGroups: groupNames || [],
                selectedSchools: schoolNames || [],
            });
        }
    }, [user]);

    const handleGroupSchoolChange = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            ...formData,
            selectedGroups: formData.selectedGroups.map(option => option.value),
            selectedSchools: formData.selectedSchools.map(option => option.value),
        };

        console.log(formDataToSend)

        try {
            const response = await profileUpdate(formDataToSend);
            if (response.success) {
                toast.success(<p className="font-bold">Dados alterados com sucesso!</p>);
            } else {
                toast.error(<p className="font-bold">Erro ao atualizar os dados!</p>);
            }

            if (avatar) {
                const avatarData = new FormData();
                avatarData.append('avatar', avatar);

                const avatarResponse = await avatarUpdate(avatarData);
                if (avatarResponse.success) {
                    toast.success(<p className="font-bold">Avatar atualizado com sucesso!</p>);
                }
            }
        } catch (err) {
            console.error(err);
            toast.error(<p className="font-bold">Erro ao atualizar os dados!</p>);
        }
    };

    return (
        <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
            <div className="intro-y mt-8 flex items-center">
                <h2 className="mr-auto text-lg font-medium">Definições da conta</h2>
            </div>
            <div className="grid grid-cols-12 gap-6">
                {/* BEGIN: Profile Menu */}
                <div className="col-span-12 flex flex-col-reverse lg:col-span-4 lg:block 2xl:col-span-3 mt-5">
                    <div className="intro-y box mt-5 lg:mt-0">
                        <div className="relative flex items-center p-5">
                            <div className="image-fit h-12 w-12">
                                <button className="bg-gray-400/80 text-white h-12 w-12 scale-110 font-bold overflow-hidden rounded-full">
                                {user?.profile?.avatarUrl && user?.profile?.avatarUrl.trim() ? (<img src={user.profile.avatarUrl} alt="Img" /> ) : ( <div classNspaname="rounded-full-black">{user.profile.name?.slice(0, 1).toUpperCase()}</div> )}
                                </button>
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="text-base font-medium">{user?.profile?.name}</div>
                                {/* <div className="text-slate-500">DevOps Engineer</div> */}
                            </div>
                        </div>
                        <div className="border-t border-slate-200/60 p-5 dark:border-darkmode-400">
                            <Link to="/user-profile" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                                <span className="ml-2">Informação pessoal</span>
                            </Link>
                            <Link to="/update-profile" className="mt-5 flex items-center font-medium text-primary">
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
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase-business"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg></span>
                                    <span className="ml-2">{userGroupsNames?.join(', ')}</span>
                                </p>
                                <p className="mt-5 flex items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-school"><path d="M14 22v-4a2 2 0 1 0-4 0v4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M18 5v17" /><path d="m4 6 8-4 8 4" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg></span>
                                    <span className="ml-2">{userSchoolNames?.join(', ')}</span>
                                </p>
                            </div>

                        </div>
                </div>

                <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                    <div className="intro-y box mt-5">
                        <div className="flex items-center border-b border-slate-200/60 p-5 dark:border-darkmode-400">
                            <h2 className="mr-auto text-base font-medium">
                                Personal Information <span className="ml-9"><Link className="text-white" to="https://gifer.com/en/gifs/raccoon">Gif</Link></span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-5">
                                <div class="flex flex-col xl:flex-row">
                                    <div class="mt-6 flex-1 xl:mt-0">
                                        <div className="grid grid-cols-12 gap-x-5">
                                            <div className="col-span-12 xl:col-span-6">
                                                <div>
                                                    <label className="inline-block mb-4 group-[.form-inline]:mb-4 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right" >
                                                        Name
                                                    </label>
                                                    <input
                                                        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10"
                                                        type="text"
                                                        placeholder="Input text"
                                                        defaultValue={user?.profile?.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>

                                                <div className="mt-3">
                                                    <label className="inline-block mb-4 group-[.form-inline]:mb-4 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right">
                                                        Email
                                                    </label>
                                                    <input type="text" defaultValue={user?.profile?.email} placeholder="Input text" disabled="disabled" className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10" />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-6">
                                                <GroupsSchools onChange={handleGroupSchoolChange} settingUser={true} />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex">
                                            <button
                                                type="submit"
                                                className="bg-primary text-white py-2 px-3 rounded-md"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mx-auto w-52 xl:ml-6 xl:mr-0">
                                        <div className="rounded-md border-2 border-dashed p-5">
                                            <div className="image-fit mx-auto h-40">
                                                {avatar ? (
                                                    <img src={URL.createObjectURL(avatar)} alt="Selected Avatar" className="rounded-md h-full w-full object-cover" />
                                                ) : (
                                                    <svg className="h-40 w-40" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                                                )}
                                            </div>
                                            <div className="relative mx-auto mt-5">
                                                <input
                                                    type="file"
                                                    onChange={handleAvatarChange}
                                                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-primary text-white w-full py-2 px-3 rounded-md"
                                                >
                                                    Alterar Foto
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}