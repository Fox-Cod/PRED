import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Context } from './Config/contexts/context';
import { observer } from 'mobx-react-lite';
import { healthCheck } from './Config/api/deviceAPI';
import { ServerError } from './Components/Other/Other';
import Cookies from 'js-cookie';

const Navigator = lazy(() => import('./Components/Navigador'));
const Index = lazy(() => import('./Content/Index'));
const Updates = lazy(() => import('./Content/Home/News'));
const Contacts = lazy(() => import('./Content/Home/Contacts'));
const UserProfile = lazy(() => import('./Profile/UserProfile'));
const UpdateProfile = lazy(() => import('./Profile/UpdateProfile'));
const UserProfileView = lazy(() => import('./Profile/UserProfileView'));
const SignIn = lazy(() => import('./Auth/Login/SignIn'));
const SignUp = lazy(() => import('./Auth/Register/SignUp'));
const Form = lazy(() => import('./Content/Form/Form'));
const Activities = lazy(() => import('./Content/Form/Activities/Activities'));
const ViewActivity = lazy(() => import('./Content/Form/Activities/ViewActivity'));
const Tool = lazy(() => import('./Content/Form/Tools/Tool'));
const AddPost = lazy(() => import('./Content/AddPosts/AddPost'));
const ErrorPage = lazy(() => import('./Content/Home/ErrorPage'));
const Chat = lazy(() => import('./Content/Chat/Chat'));



const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg className="h-mid w-mid" width="75" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <rect y="10" width="15" height="120" rx="6">
          <animate values="120;110;100;90;80;70;60;50;40;140;120" attributeName="height" begin="0.5s" dur="1s" calcMode="linear" repeatCount="indefinite" />
          <animate values="10;15;20;25;30;35;40;45;50;0;10" attributeName="y" begin="0.5s" dur="1s" calcMode="linear" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="10" width="15" height="120" rx="6">
          <animate values="120;110;100;90;80;70;60;50;40;140;120" attributeName="height" begin="0.25s" dur="1s" calcMode="linear" repeatCount="indefinite" />
          <animate values="10;15;20;25;30;35;40;45;50;0;10" attributeName="y" begin="0.25s" dur="1s" calcMode="linear" repeatCount="indefinite" />
        </rect>
        <rect x="60" width="15" height="140" rx="6">
          <animate values="120;110;100;90;80;70;60;50;40;140;120" attributeName="height" begin="0s" dur="1s" calcMode="linear" repeatCount="indefinite" />
          <animate values="10;15;20;25;30;35;40;45;50;0;10" attributeName="y" begin="0s" dur="1s" calcMode="linear" repeatCount="indefinite" />
        </rect>
        <rect x="90" y="10" width="15" height="120" rx="6">
          <animate values="120;110;100;90;80;70;60;50;40;140;120" attributeName="height" begin="0.25s" dur="1s" calcMode="linear" repeatCount="indefinite" />
          <animate values="10;15;20;25;30;35;40;45;50;0;10" attributeName="y" begin="0.25s" dur="1s" calcMode="linear" repeatCount="indefinite" />
        </rect>
        <rect x="120" y="10" width="15" height="120" rx="6">
          <animate values="120;110;100;90;80;70;60;50;40;140;120" attributeName="height" begin="0.5s" dur="1s" calcMode="linear" repeatCount="indefinite" />
          <animate values="10;15;20;25;30;35;40;45;50;0;10" attributeName="y" begin="0.5s" dur="1s" calcMode="linear" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>

  );
};

const App = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [immunityTime, setImmunityTime] = useState(600);
  const isSignInPage = ['/sign-in', '/', '/sign-up', '/password-reset-email', '/reset-password', '/updates', '/contacts', '/error-page'].includes(location.pathname);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 1500);
    const loadData = async () => {
      try {
        await healthCheck();
        setServerError(false);
        setServerErrorMessage('');
      } catch (error) {
        console.error("Erro no servidor:", error);
        setServerError(true);
        setServerErrorMessage(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, randomDelay);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const immunityCookie = Cookies.get('immunity');
    const isImmunityActive = immunityCookie === 'true';

    if (serverError && !isImmunityActive) {
      navigate('/server-error');
    } else if (isImmunityActive) {
      console.log('Imunidade ativa, você pode navegar pelo site.');
      const timer = setInterval(() => {
        setImmunityTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            Cookies.remove('immunity');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [serverError, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <p className='text-center'>{serverErrorMessage}</p>
      {Cookies.get('immunity') === 'true' && (
        <div className='text-center font-medium'>
          Temporizador de imunidade: {formatTime(immunityTime)}
        </div>
      )}
      <Suspense>
        <Navigator isActive={!isSignInPage}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/contacts" element={<Contacts />} />
            {user.isAuth === false ? (
              <Route path="/sign-in" element={<SignIn />} />
            ) : (
              <Route path="/sign-in" element={<Navigate to="/" />} />
            )}
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/form" element={<Form />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/tools" element={<Tool />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/view-activity/:activityId" element={<ViewActivity />} />

            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-profile-view/:idTeacher" element={<UserProfileView />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/chat" element={<Chat />} />

            <Route path="/chat/:chatToken" element={<Chat />} />

            <Route path="/server-error" element={<ServerError />} />

            <Route path="/error-page" element={<ErrorPage />} />

            <Route path="*" element={<Navigate to="/error-page" />} />
          </Routes>
        </Navigator>
      </Suspense>
    </>
  );
});

export default App;
