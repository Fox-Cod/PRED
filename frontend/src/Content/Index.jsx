import React from "react";
import { Link } from "react-router-dom";
import { HomeNavbar } from "./Home/HomeNavbar";
import teamUpImage from '../assets/images/bgindex.jpg'
import personalDataImage from '../assets/images/personal-data.svg'
import teamCollaborationImage from '../assets/images/team-collaboration.svg'
import backgroundVideo from '../assets/images/backgroundVideo.mp4'

export default function Index() {
    return (
        <>
            <HomeNavbar />

            <div className="relative h-screen bg-primary">
                <div className="absolute inset-0 overflow-hidden">
                    {/* <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={backgroundVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                    ></video> */}
                    <img src={teamUpImage} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <h1 className="text-5xl font-bold">EduShare</h1>
                    <span className="text-normal font-bold mb-2">Partilha de Recursos Educativos Digitais</span>
                    <p className="text-lg mb-5 max-w-xl leading-relaxed">
                        Vamos melhorar as nossas competências através de colaboração, publicações e trabalho em equipa no ambiente educativo.
                    </p>
                    <Link to="/form" className="bg-primary hover:bg-primarys-dark transition duration-300 py-3 px-6 rounded-md text-white font-medium">
                        Junte-se a Nós
                    </Link>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            </div>

            {/* <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Troca de Experiências</h2>
                    <p className="text-center text-lg mb-12">
                        Partilhe os seus métodos de ensino, aprenda com outros e melhore as suas técnicas educacionais.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <img src={teamUpImage} alt="Troca de Experiências" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold mb-4">Partilha de Metodologias</h3>
                            <p className="text-gray-700 mb-6">
                                Explore novas formas de ensinar, troque ideias com colegas e inspire-se em metodologias inovadoras que têm impacto positivo na aprendizagem.
                            </p>
                            <Link to="/methodologies" className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark">
                                Ver Mais
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Publicações e Atividades</h2>
                    <p className="text-center text-lg mb-12">
                        Mantenha-se atualizado com as últimas publicações, eventos educativos e atividades em destaque.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h3 className="text-3xl font-semibold mb-4">Atividades Recentes</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li className="mb-4">Participação em Webinars Semanais</li>
                                <li className="mb-4">Publicação de Artigos Académicos</li>
                                <li className="mb-4">Workshops de Formação em Ensino</li>
                                <li>Encontros de Professores e Discussão de Temas Educacionais</li>
                            </ul>
                            <Link to="/activities" className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primarys-dark mt-6 inline-block">
                                Ver Todas as Atividades
                            </Link>
                        </div>
                        <div>
                            <img src={personalDataImage} alt="Publicações e Atividades" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Planos e Apresentações</h2>
                    <p className="text-center text-lg mb-12">
                        Acesse planos de aula e recursos de apresentações para melhorar a sua abordagem educacional.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-semibold mb-4">Planos de Aula</h3>
                            <p className="text-gray-700 mb-4">
                                Explore planos de aula detalhados para diferentes níveis de ensino.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-semibold mb-4">Apresentações Interativas</h3>
                            <p className="text-gray-700 mb-4">
                                Crie e baixe apresentações interativas para usar nas suas aulas.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-semibold mb-4">Projetos Colaborativos</h3>
                            <p className="text-gray-700 mb-4">
                                Colabore em projetos de aprendizagem e promova o trabalho em equipa entre alunos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Trabalho em Equipa</h2>
                    <p className="text-center text-lg mb-12">
                        Junte-se a outros educadores para trabalhar em projetos colaborativos e partilhar experiências.
                    </p>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                        <div className="flex-1">
                            <img src={teamCollaborationImage} alt="Trabalho em Equipa" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-medium mb-4">Projetos Colaborativos</h3>
                            <p className="text-gray-700 mb-6">
                                Trabalhe em equipa para desenvolver soluções inovadoras e criar projetos educativos de impacto. Participe em grupos de trabalho, partilhe recursos e crie um ambiente colaborativo entre professores.
                            </p>
                            <h4 className="text-2xl font-medium mb-3">Partilha de Conhecimento</h4>
                            <p className="text-gray-700 mb-6">
                                Explore novas metodologias e práticas pedagógicas, aprenda com as experiências dos seus colegas e partilhe o seu próprio conhecimento. Ao colaborar, todos beneficiam de uma rede de apoio e inspiração contínua.
                            </p>
                            <h4 className="text-2xl font-medium mb-3">Desenvolvimento de Competências</h4>
                            <p className="text-gray-700 mb-6">
                                Ganhe novas competências e melhore as suas capacidades de liderança e comunicação. Ao participar em projetos colaborativos, você desenvolve habilidades cruciais para o trabalho em equipa, a resolução de problemas e a inovação educacional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8">O que os Professores Dizem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                                "Participar nesta plataforma transformou a forma como leciono. Os recursos e a colaboração são inestimáveis!"
                            </p>
                            <h3 className="font-semibold">Maria Fernandes</h3>
                            <p className="text-gray-600">Professora de Matemática</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg italic mb-4">
                                "Adoro como podemos compartilhar planos de aula e colaborar em tempo real com outros educadores."
                            </p>
                            <h3 className="font-semibold">Carlos Lopes</h3>
                            <p className="text-gray-600">Professor de Ciências</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-transparent absolute w-full p-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Plataforma de Partilha de Conhecimento. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}
