import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from '../../assets/images/error-illustration.svg'

export default function ErrorPage() {
    return (
        <div className="py-2 bg-gradient-to-b from-theme-1 to-theme-2">
            <div className="container">

                <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
                    <div className="-intro-x lg:mr-20">
                        <img className="h-48 w-[450px] lg:h-auto" src={ErrorImg} />
                    </div>
                    <div className="mt-10 text-white lg:mt-0">
                        <div className="font-medium intro-x text-8xl">404</div>
                        <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                            Ops. Esta página desapareceu.
                        </div>
                        <div className="mt-3 text-lg intro-x">
                            Pode ter introduzido mal o endereço ou a página pode ter mudado de sítio.
                        </div>
                        <Link to="/" className="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed px-4 py-3 mt-10 text-white border-white intro-x">
                            Voltar ao início
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}