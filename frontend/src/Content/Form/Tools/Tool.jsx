import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../../../Components/Other/Other";
import { getTools } from "../../../Config/api/deviceAPI";

export default function Tool() {
    const [tools, setTools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [toolsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTools();
                setTools(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const filteredTools = tools.filter(
        (tool) =>
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">

                <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
                    <h2 className="mr-auto text-lg font-medium">Ferramentas</h2>
                    <div className="mt-3 w-full sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
                        <div className="relative w-56 text-slate-500">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 !box w-56 pr-10"
                            />
                            <svg className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                </div>


                <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    {currentTools.length > 0 ? (
                        <div className="col-span-12 mt-6">
                            <div className="intro-y mt-8 overflow-auto">
                                <div className="max-w-full overflow-auto">
                                    <table data-tw-merge="" className="w-full text-left border-separate border-spacing-y-[10px] sm:mt-2">
                                        <thead data-tw-merge="">
                                            <tr data-tw-merge="">
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0">NOME DO PRODUTO</th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">APLICAÇÃO</th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">TIPO</th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">ESTADO</th>
                                                <th className="font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0 text-center">DETALHES</th>
                                            </tr>
                                        </thead>
                                        {currentTools.map((tool, index) => (
                                            <tbody key={index}>
                                                <tr className="intro-x">
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <a className="whitespace-nowrap font-medium" href="">
                                                            {tool.title}
                                                        </a>
                                                        <div className="mt-0.5 whitespace-nowrap text-xs text-slate-500" title={tool.about}>
                                                            {tool.about.slice(0, 120) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center" title={tool.application}>
                                                            <i data-tw-merge="" data-lucide="check-square" className="stroke-1.5 mr-2 h-4 w-4"></i>
                                                            {tool.application.slice(0, 22) + '...'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                                                        <div className="flex items-center justify-center" title={tool.type}>
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
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-12 rounded-2xl shadow-2xl transform transition duration-300">
                            <div className="flex flex-col text-dark items-center">
                                <div className="bg-dark p-3 rounded-full mb-4 shadow-md transform transition duration-500 hover:rotate-12">
                                    <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
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
                {currentTools.length > 0 ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(tools.length / toolsPerPage)}
                        onPageChange={paginate}
                    />
                ) : (null)}
            </div>
        </>
    );
}
