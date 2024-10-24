import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import img from '../../assets/images/illustration.svg';
import { getGroupsSchools } from "../../Config/api/deviceAPI";
import { registration } from "../../Config/api/userAPI";

export default function SignUp() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        selectedGroups: [],
        selectedSchools: [],
    });

    const [schoolOptions, setSchoolOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [errors, setErrors] = useState({});

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
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (selectedOptions, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: selectedOptions || []
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submissionData = {
            ...formData,
            selectedGroups: formData.selectedGroups.map(option => option.value),
            selectedSchools: formData.selectedSchools.map(option => option.value),
        };

        try {
            const response = await registration(submissionData);
            if (response.success) {
                window.location.href = '/';
            } else {
                setErrors({}); 
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors); 
        }
    };

    return (
        <div className="p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600 before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400 after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700">
            <div className="container relative z-10 sm:px-10">
                <div className="block grid-cols-2 gap-4 xl:grid">
                    <div className="hidden min-h-screen flex-col xl:flex">
                        <Link className="-intro-x flex items-center pt-5" to="/">
                            <span className="ml-3 text-lg text-white"> EduShare </span>
                        </Link>
                        <div className="my-auto">
                            <img className="-intro-x -mt-16 w-1/2" src={img} alt="Illustration" />
                            <div className="-intro-x mt-10 text-4xl font-medium leading-tight text-white">
                                A few more clicks to <br />
                                sign up to your account.
                            </div>
                            <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                                Manage all your e-commerce accounts in one place
                            </div>
                        </div>
                    </div>

                    <div className="my-10 flex h-screen py-5 xl:my-0 xl:h-auto xl:py-0">
                        <div className="mx-auto my-auto w-full rounded-md bg-white px-5 py-8 shadow-md dark:bg-darkmode-600 sm:w-3/4 sm:px-8 lg:w-2/4 xl:ml-20 xl:w-auto xl:bg-transparent xl:p-0 xl:shadow-none">
                            <h2 className="intro-x text-center text-2xl font-bold xl:text-left xl:text-3xl">
                                Registar-se
                            </h2>
                            <div className="intro-x mt-8">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="mt-4 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                />
                                {errors.nome && <div className="text-red-500 mt-2">{errors.nome}</div>}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="mt-4 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                {errors.email && <div className="text-red-500 mt-2">{errors.email}</div>}

                                <input
                                    type="password"
                                    placeholder="Palavra-passe"
                                    className="mt-4 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />

                                <input
                                    type="password"
                                    placeholder="Confirmação da palavra-passe"
                                    className="mt-4 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}

                                <Select
                                    className="mt-4"
                                    placeholder="Selecione escolas"
                                    options={schoolOptions}
                                    isMulti
                                    value={formData.selectedSchools}
                                    onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedSchools')}
                                />
                                {errors.selectedSchools && <div className="text-red-500 mt-2">{errors.selectedSchools}</div>}

                                <Select
                                    className="mt-4"
                                    placeholder="Selecione grupos"
                                    options={groupOptions}
                                    isMulti
                                    value={formData.selectedGroups}
                                    onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'selectedGroups')}
                                />
                                {errors.selectedGroups && <div className="text-red-500 mt-2">{errors.selectedGroups}</div>}

                            </div>

                            <div className="intro-x mt-5 text-center xl:mt-8 xl:text-left">
                                <button
                                    className="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary w-full px-4 py-3 align-top xl:mr-3 xl:w-32"
                                    onClick={handleSubmit}
                                >
                                    Registo
                                </button>
                                <Link
                                    to="/sign-in"
                                    className="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20 [&:hover:not(:disabled)]:dark:bg-darkmode-100/10 mt-3 w-full px-4 py-3 align-top xl:mt-0 xl:w-32"
                                >
                                    Iniciar sessão
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
