import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LoadingDots = ({ setDots }) => {
  useEffect(() => {
    const animateDots = () => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    };

    const interval = setInterval(animateDots, 500);

    return () => clearInterval(interval);
  }, [setDots]);

  return null;
};

export const SideNav = () => {
  const [dots, setDots] = useState('');
  const location = useLocation();

  const routes = [
    { path: "/add-post", name: "Adicionar publicação" },
    { path: "/user-profile", name: "Perfil" },
    { path: "/user-profile-view", name: "Ver Perfil", partial: true },
    { path: "/update-profile", name: "Configurações" },
    { path: "/view-activity", name: "Ver Atividade", partial: true },
    { path: "/server-error", name: `Sem resposta${dots}` },
    { path: "/add-team", name: "Adicionar equipa" },
  ];

  const isActive = (route) => 
    route.partial 
      ? location.pathname.startsWith(route.path) 
      : location.pathname === route.path;

  const currentRoute = routes.find(route => isActive(route));

  return (
    <>
      <nav className="side-nav hidden w-[100px] overflow-x-hidden px-5 pb-16 pt-8 md:block xl:w-[250px]">
        <ul>
          {currentRoute ? (
            <>
              <li key={currentRoute.path}>
                <Link to={currentRoute.path} className="side-menu side-menu--active">
                  <div className="side-menu__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shapes">
                      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <circle cx="17.5" cy="17.5" r="3.5" />
                    </svg>
                  </div>
                  <div className="side-menu__title">
                    {currentRoute.name}
                  </div>
                </Link>
              </li>
              <li className="side-nav__divider my-6"></li>
            </>
          ) : null}

          <li>
            <Link to="/form" className={`side-menu ${isActive({ path: "/form" }) ? "side-menu--active" : ""}`}>
              <div className="side-menu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                </svg>
              </div>
              <div className="side-menu__title">Formulário</div>
            </Link>
          </li>

          <li>
            <Link to="/activities" className={`side-menu ${isActive({ path: "/activities" }) ? "side-menu--active" : ""}`}>
              <div className="side-menu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              </div>
              <div className="side-menu__title">Atividades</div>
            </Link>
          </li>

          <div className="mt-3 mb-3 border-b border-slate-200/10"></div>

          <li>
            <Link to="/tools" className={`side-menu ${isActive({ path: "/tools" }) ? "side-menu--active" : ""}`}>
              <div className="side-menu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-chart-gantt">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 8h7" />
                  <path d="M8 12h6" />
                  <path d="M11 16h5" />
                </svg>
              </div>
              <div className="side-menu__title">Ferramentos</div>
            </Link>
          </li>

          <div className="mt-3 mb-3 border-b border-slate-200/10"></div>

          <li>
            <Link to="/chat" className={`side-menu ${isActive({ path: "/chat", partial: true }) ? "side-menu--active" : ""}`}>
              <div className="side-menu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
              </div>
              <div className="side-menu__title">Conversa</div>
            </Link>
          </li>
        </ul>

        {isActive({ path: "/server-error" }) && <LoadingDots setDots={setDots} />}
      </nav>
    </>
  );
};
