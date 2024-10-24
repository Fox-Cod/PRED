import React, { useState } from 'react';
import { HomeNavbar } from './HomeNavbar';
import contactImage from '../../assets/images/new-update.svg'; // Убедитесь, что изображение существует

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Обработка отправки формы, например, отправка на сервер
        console.log('Форма отправлена', formData);
        // Очистка формы после отправки
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <HomeNavbar />

            {/* Seção Hero */}
            <div className="relative h-[80vh] flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        className="absolute w-full h-full flex items-center justify-center top-[7vh]"
                        src={contactImage}
                        alt="Contactos"
                    />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-5xl font-bold mb-4">Contacte-nos</h1>
                    <p className="text-lg md:text-2xl mb-6">
                        Estamos aqui para ajudar! Entre em contacto connosco para qualquer dúvida ou informação.
                    </p>
                    <p className="mt-3 text-center">
                        Nosso email: <a href="mailto:predinc01@gmail.com" className="hover:underline">predinc01@gmail.com</a>
                    </p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            </div>

            {/* Seção de Contactos */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Informações de Contacto</h2>
                    <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
                        Para questões gerais, sugestões ou comentários, utilize as informações abaixo para nos contactar.
                    </p>

                    {/* Форма обратной связи */}
                    <div className="mt-16 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Envie-nos uma Mensagem</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700">Mensagem</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 intro-x block min-w-full px-4 py-3 xl:min-w-[350px]"
                                />
                            </div>
                            <button type="submit" className="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary w-full px-4 py-3 align-top">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
