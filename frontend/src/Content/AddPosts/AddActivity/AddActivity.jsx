import React, { useState } from 'react';
import { DropzoneComponent } from "../../../Components/DropzoneComponent";
import { SubjectsEducationsYears } from '../../../Components/Other/Dublication';
import { addActivity } from '../../../Config/api/deviceAPI';

import { toast } from 'react-toastify';

export const AddAcitvity = () => {
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        planning: '',
        presentation: '',
        selectedSubjects: [] || null,
        selectedEducations: [] || null,
        selectedYears: [] || null,
        files: [] || null,
    });

    const handleFileChange = (files) => {
        setFormData((prevData) => ({
            ...prevData,
            files,
        }));
    };

    const handleSubjectsEducationsYearsChange = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error(<p className="font-bold">Por favor!<br /> <span className='text-xs text-slate-400'>Preencha todos os campos obrigatórios.</span></p>);
            return;
        }

        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', formData.description);
        submissionData.append('planning', formData.planning);
        submissionData.append('presentation', formData.presentation);

        submissionData.append('selectedSubjects', JSON.stringify(formData.selectedSubjects.map(option => option.value)));
        submissionData.append('selectedEducations', JSON.stringify(formData.selectedEducations.map(option => option.value)));
        submissionData.append('selectedYears', JSON.stringify(formData.selectedYears.map(option => option.value)));

        if (formData.files && formData.files.length > 0) {
            formData.files.forEach((file, index) => {
                submissionData.append('files', file);
            });
        }

        try {
            const response = await addActivity(submissionData);
            if (response && response.success) {
                toast.success(<p className="font-bold">Atividade adicionada com sucesso!</p>);
                window.location.href = '/form';
            } else {
                toast.error(<p className="font-bold">Erro ao adicionar atividade. Tente novamente.</p>);
            }
        } catch (err) {
            console.log(err);
            setError(err.response.data.errors);
        }
    };

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y box mt-5 p-5">
                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                        <div className="flex items-center border-b border-slate-200/60 pb-5 text-base font-medium dark:border-darkmode-400">
                            <i data-tw-merge="" data-lucide="chevron-down" className="stroke-1.5 mr-2 h-4 w-4" />
                            Detalhes da Publicação
                        </div>
                        <div className="mt-5">
                            <div data-tw-merge="" forminline="formInline" className="block sm:flex group form-inline mt-5 flex-col items-start pt-5 first:mt-0 first:pt-0 xl:flex-row">
                                <label data-tw-merge="" className="inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right xl:!mr-10 xl:w-64" >
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Título</div>
                                            <div className="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                                                Obrigatório
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                            <div>
                                                O título deve ser claro e conciso para que seja facilmente compreendido pelos alunos e professores.
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <div className="mt-3 w-3/4 xl:mt-0">
                                    <input
                                        type="text"
                                        placeholder="Nome do Título"
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 form-control form-control"
                                    />
                                    <div data-tw-merge="" className="text-xs text-slate-500 mt-2 text-right" >
                                        {error.title && <div className="text-red-500 mt-2">{error.title}</div>}
                                        Pelo menos 4 caracteres
                                    </div>
                                </div>

                            </div>


                            <div data-tw-merge="" forminline="formInline" className="block sm:flex group form-inline mt-5 flex-col items-start pt-5 first:mt-0 first:pt-0 xl:flex-row">
                                <label data-tw-merge="" className="inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right xl:!mr-10 xl:w-64" >
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Descrição</div>
                                            <div className="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                                                Obrigatório
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                            <div>
                                                A descrição deve fornecer uma explicação detalhada da atividade para facilitar a compreensão pelos alunos e professores.
                                            </div>
                                            <div className="mt-2">
                                                Certifique-se de que a descrição aborde os principais objetivos da atividade, os tópicos que serão cobertos e quaisquer instruções específicas para os alunos. Isso ajudará tanto os professores quanto os alunos a entenderem melhor o conteúdo e o propósito da atividade.
                                            </div>
                                        </div>

                                    </div>
                                </label>
                                <div className="mt-3 w-3/4 xl:mt-0">
                                    <textarea
                                        placeholder="Digite os seus comentários"
                                        className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full h-[300px] text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 form-control form-control" defaultValue={""}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />

                                    <div className="text-xs text-slate-500 mt-2 text-right" >
                                        {error.description && <div className="text-red-500 mt-2">{error.description}</div>}
                                        Máximo de caracteres {formData.description.length}/8000
                                    </div>
                                </div>

                            </div>

                            <div data-tw-merge="" forminline="formInline" className="block sm:flex group form-inline mt-5 flex-col items-start pt-5 first:mt-0 first:pt-0 xl:flex-row">
                                <label data-tw-merge="" className="inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right xl:!mr-10 xl:w-64" >
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Recursos de Ensino</div>
                                        </div>
                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                            <div>
                                                Forneça os links para a apresentação e o plano que serão usados durante a aula.
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <div className="mt-3 w-3/4 xl:mt-0">
                                    <div className="grid grid-cols-12 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Link para a sua apresentação"
                                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 col-span-6 col-span-6"
                                            onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Link para o seu plano de aula"
                                            className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 col-span-6 col-span-6"
                                            onChange={(e) => setFormData({ ...formData, planning: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="block sm:flex group form-inline mt-5 flex-col items-start pt-5 first:mt-0 first:pt-0 xl:flex-row">
                                <label className="inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right xl:!mr-10 xl:w-64">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Categorias Educacionais</div>
                                        </div>
                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                            <div>
                                                Selecione a categoria educacional que melhor se encaixa na sua atividade. Isso ajudará os alunos e professores a entenderem rapidamente o foco do conteúdo.
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                <SubjectsEducationsYears onChange={handleSubjectsEducationsYearsChange} />
                            </div>

                            <div data-tw-merge="" forminline="formInline" className="block sm:flex group form-inline mt-5 flex-col items-start pt-5 first:mt-0 first:pt-0 xl:flex-row">
                                <label data-tw-merge="" className="inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right xl:!mr-10 xl:w-64" >
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Arquivos</div>
                                        </div>
                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                            <div>
                                                Aqui, professores e alunos podem partilhar ficheiros relacionados com projectos ou materiais de ensino.
                                                Isto pode incluir apresentações, relatórios, trabalhos ou outros documentos úteis para a colaboração e partilha de experiências.
                                            </div>
                                        </div>

                                    </div>
                                </label>
                                <DropzoneComponent onFileChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex flex-col justify-end gap-2 md:flex-row">
                    <button data-tw-merge="" type="button" className="transition duration-200 border shadow-sm inline-flex items-center justify-center px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed w-full border-slate-300 py-3 text-slate-500 dark:border-darkmode-400 md:w-52">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} type="submit" className="transition duration-200 border shadow-sm inline-flex items-center justify-center px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary w-full py-3 md:w-52">
                        Publicar
                    </button>
                </div>
            </div>
        </>
    );
};
