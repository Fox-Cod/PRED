import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTools } from "../../../Config/api/deviceAPI";

export default function Tool() {
    const [tools, setTools] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTools();
                setTools(data);
            } catch (err) {
                console.log(err)
                setError(true)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
                    <h2 className="mr-auto text-lg font-medium">Ferramentas</h2>
                    {/* <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
                        <Link data-tw-merge="" data-tw-toggle="modal" data-tw-target="#new-order-modal" to="#" className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md">
                            Adicionar publicações
                        </Link>
                    </div> */}
                    <div className="mt-3 w-full sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
                        <div className="relative w-56 text-slate-500">
                            <input data-tw-merge="" type="text" placeholder="Pesquisar..." className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 !box w-56 pr-10" />
                            <svg className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>

                </div>
                <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    <div className="col-span-12 mt-6">
                        <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible">
                            <table data-tw-merge="" className="w-full text-left border-separate border-spacing-y-[10px] sm:mt-2">
                                <thead data-tw-merge="" className="">
                                    <tr data-tw-merge="" className="">
                                        <th data-tw-merge="" className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0">
                                            NOME DO PRODUTO
                                        </th>
                                        <th data-tw-merge="" className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                            APLICAÇÃO
                                        </th>
                                        <th data-tw-merge="" className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                            TIPO
                                        </th>
                                        <th data-tw-merge="" className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                            ESTADO
                                        </th>
                                        <th data-tw-merge="" className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                            DETALHES
                                        </th>
                                    </tr>
                                </thead>
                                {tools.map((tool, index) => (
                                    <tbody key={index}> 
                                        <tr data-tw-merge="" className="intro-x">
                                            <td data-tw-merge="" className="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                <a className="whitespace-nowrap font-medium" href="">
                                                    {tool.title}
                                                </a>
                                                <div className="mt-0.5 whitespace-nowrap text-xs text-slate-500" title={tool.about}>
                                                    {tool.about.slice(0, 120) + '...'}
                                                </div>
                                            </td>
                                            <td data-tw-merge="" className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                <div className="flex items-center justify-center text-secundary" title={tool.application}>
                                                    <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                    {tool.application.slice(0, 22) + '...'}
                                                </div>
                                            </td>
                                            <td data-tw-merge="" className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                <div className="flex items-center justify-center text-secundary" title={tool.type}>
                                                    <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                    {tool.type.slice(0, 22) + '...'}
                                                </div>
                                            </td>
                                            <td data-tw-merge="" className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                <div className="flex items-center justify-center text-success" title={tool.state}>
                                                    <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                    {tool.state.slice(0, 22) + '...'}
                                                </div>
                                            </td>
                                            <td data-tw-merge="" className="px-5 py-3 border-b dark:border-darkmode-300 box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400">
                                                <div className="flex items-center justify-center">
                                                    <Link className="flex items-center text-primary font-bold" to={tool.link}>
                                                        Ir para a página
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}