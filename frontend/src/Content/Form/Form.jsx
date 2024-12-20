import React, { useEffect, useState } from "react";
import { ActivityListForForm } from "../../Components/Other/Dublication";
import { getTools } from "../../Config/api/deviceAPI";
// import SortTime from "../../Components/Other/Other";
import { Link } from "react-router-dom";

export default function Form() {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTools();
                setTools(data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
                <div class="intro-y mt-8 flex flex-col items-center sm:flex-row">
                    <h2 class="mr-auto text-lg font-medium">Visão geral</h2>
                    <div class="mt-4 flex w-full sm:mt-0 sm:w-auto">
                        <Link to="/add-post" class="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mr-2 shadow-md">
                            Adicionar publicações
                        </Link>
                    </div>
                </div>
                <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">


                    <ActivityListForForm limit={4} />


                    <div className="col-span-12 mt-6">
                        <div className="intro-y block h-10 items-center sm:flex">
                            <h2 className="mr-5 truncate text-lg font-medium">
                                Melhores ferramentas
                            </h2>
                        </div>
                        {tools.length > 0 ? (
                            <div className="intro-y mt-8 overflow-x-auto">
                                <div className="max-w-full overflow-auto">
                                    <table className="min-w-full text-left border-separate border-spacing-y-[10px]">
                                        <thead>
                                            <tr>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0">
                                                    NOME DO PRODUTO
                                                </th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                                    APLICAÇÃO
                                                </th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                                    TIPO
                                                </th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                                    ESTADO
                                                </th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">
                                                    DETALHES
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tools.slice(0, 5).map((tool, index) => (
                                                <tr key={index} className="intro-x">
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <a className="whitespace-nowrap font-medium" href="">
                                                            {tool.title}
                                                        </a>
                                                        <div className="mt-0.5 whitespace-nowrap text-xs text-slate-500" title={tool.about}>
                                                            {tool.about.slice(0, 120) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center text-secundary" title={tool.application}>
                                                            <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                            {tool.application.slice(0, 22) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center text-secundary" title={tool.type}>
                                                            <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                            {tool.type.slice(0, 22) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center text-success" title={tool.state}>
                                                            <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                            {tool.state.slice(0, 22) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center">
                                                            <Link className="flex items-center text-primary font-bold" to={tool.link}>
                                                                Ir para a página
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-12 rounded-2xl shadow-2xl transform transition duration-300">
                                <div className="flex flex-col text-dark items-center">
                                    <div className="bg-dark p-3 rounded-full mb-4 shadow-md transform transition duration-500 hover:rotate-12">
                                        <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
                                        Ferramentas não encontradas
                                    </h2>
                                    <p className="text-lg font-medium max-w-md mb-6 tracking-wide opacity-90">
                                        Por enquanto, está vazio. Num futuro próximo, serão adicionadas mais ferramentas diferentes
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}