import axios from "axios";

export const API_URL = "https://redshare.pt/" 

const $host = axios.create({
    baseURL: API_URL

});

const $authHost = axios.create({
    baseURL: API_URL
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${getCookie("token")}`;
    config.withCredentials = true;
    return config;
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
