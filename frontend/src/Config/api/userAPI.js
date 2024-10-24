import { $authHost, $host } from "./index";

export const registration = async (userData) => {
    const { data } = await $host.post('api/auth/registration', userData)
    return data
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/auth/login', { email, password }, { withCredentials: true });
    return data;
}

export const authGoogle = async (token) => {
    const { data } = await $host.post('api/user/auth/google', { token }, { withCredentials: true });
    return data;
}

export const check = async () => {
    const { data } = await $authHost.get('api/auth/checking-auth')
    return data;
}

export const logout = async () => {
    const { data } = await $authHost.post('api/logout')
    return data;
}

export const profile = async () => {
    const { data } = await $authHost.get('api/user/profile')
    return data
}
