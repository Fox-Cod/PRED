import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HomeNavbar } from './HomeNavbar';
import newUpdateImage from '../../assets/images/new-update2.svg';
import { Pagination } from '../../Components/Other/Other';

export default function Updates() {
    const [commits, setCommits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commitsPerPage = 6;

    useEffect(() => {
        async function fetchCommits() {
            try {
                const response = await axios.get(`https://api.github.com/repos/Fox-Cod/PRED/commits`);
                setCommits(response.data);
            } catch (error) {
                console.error("Erro ao receber commits:", error);
            }
        }
        fetchCommits();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(commits.length / commitsPerPage);

    const indexOfLastCommit = currentPage * commitsPerPage;
    const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
    const currentCommits = commits.slice(indexOfFirstCommit, indexOfLastCommit);

    return (
        <>
            <HomeNavbar />

            <div className="relative h-[80vh] flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        className="absolute w-full h-full flex items-center justify-center top-[7vh]"
                        src={newUpdateImage}
                        alt="Atualizações do Website"
                    />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-6xl font-bold mb-4">Últimas Atualizações do Website</h1>
                    <p className="text-lg md:text-2xl mb-8">
                        Descubra as mais recentes melhorias e funcionalidades desenhadas para melhorar a sua experiência.
                    </p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
            </div>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">O Que Há de Novo</h2>
                    <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
                        Mantenha-se atualizado com as mais recentes melhorias e novas funcionalidades para melhorar a sua navegação e eficiência na plataforma.
                    </p>
                    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
                        {currentCommits.map((commit) => (
                            <div key={commit.sha} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    {commit.commit.message}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(commit.commit.author.date).toLocaleDateString()}
                                </p>
                                <p className="mt-3 text-gray-700">
                                    Autor: {commit.commit.author.name}
                                </p>
                                <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">
                                    Leia mais no GitHub
                                </a>
                            </div>
                        ))}
                    </div>

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </div>
            </section>
        </>
    );
}
