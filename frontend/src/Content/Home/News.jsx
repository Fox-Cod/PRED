import React from 'react';
import { HomeNavbar } from './HomeNavbar';
import { Link } from 'react-router-dom';
import newUpdateImage from '../../assets/images/new-update2.svg'
import backgroundVideo from '../../assets/images/backgroundVideo.mp4'

export default function Updates() {
    return (
        <>
    <HomeNavbar />

    {/* Seção Hero */}
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

    {/* Seção de Atualizações */}
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">O Que Há de Novo</h2>
            <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
                Mantenha-se atualizado com as mais recentes melhorias e novas funcionalidades para melhorar a sua navegação e eficiência na plataforma.
            </p>

            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
                {/* Cartão de Atualização */}
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600">Nova Funcionalidade de Pesquisa</h3>
                    <p className="text-sm text-gray-500">1 de Outubro de 2024</p>
                    <p className="mt-3 text-gray-700">
                        Adicionámos uma nova funcionalidade de pesquisa que permite encontrar informações de forma mais rápida e eficaz.
                    </p>
                </div>

                {/* Cartão de Atualização */}
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600">Melhorias na Interface do Utilizador</h3>
                    <p className="text-sm text-gray-500">20 de Setembro de 2024</p>
                    <p className="mt-3 text-gray-700">
                        A nossa interface foi atualizada para proporcionar uma experiência de navegação mais fluida e intuitiva.
                    </p>
                </div>

                {/* Cartão de Atualização */}
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600">Notificações em Tempo Real</h3>
                    <p className="text-sm text-gray-500">15 de Agosto de 2024</p>
                    <p className="mt-3 text-gray-700">
                        Agora pode receber notificações em tempo real sobre atualizações e eventos relevantes para si.
                    </p>
                </div>

                {/* Cartão de Atualização */}
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600">Melhorias no Desempenho do Sistema</h3>
                    <p className="text-sm text-gray-500">5 de Julho de 2024</p>
                    <p className="mt-3 text-gray-700">
                        Implementámos várias otimizações que melhoraram significativamente o desempenho do sistema, tornando-o mais rápido e fiável.
                    </p>
                </div>
            </div>
        </div>
    </section>
</>

    );
}
