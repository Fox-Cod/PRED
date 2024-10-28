import {$authHost, $host} from "./index";


// Server
export const healthCheck = async () => {
    const {data} = await $host.get(`api/health-check`)
    return data
}

// Profile
export const profileView = async (userId) => {
    const {data} = await $host.get(`api/user/profile-view/${(userId)}`)
    return data
}

export const profileUpdate = async (formData) => {
    const {data} = await $authHost.post(`api/user/profile-update`, formData)
    return data
}

export const avatarUpdate = async (avatar) => {
    const {data} = await $authHost.post(`api/user/upload-avatar`, avatar)
    return data
}

export const addORdeleteFriend = async (formData) => {
    const {data} = await $authHost.post(`api/user/add-or-delete-friend`, formData)
    return data
}

//Chat
export const getUserChats = async () => {
    const {data} = await $authHost.get(`api/chat/chats`)
    return data
}

export const createChat = async (participants) => {
    const {data} = await $authHost.post(`api/chat/create`, participants)
    return data
}

export const sendMessage = async (chatToken) => {
    const {data} = await $authHost.post(`api/chat/${(chatToken)}/message`, chatToken)
    return data
}

export const getMessages = async (chatToken) => {
    const {data} = await $authHost.get(`api/chat/${(chatToken)}`)
    return data
}


// Tool
export const getTools = async () => {
    const {data} = await $host.get('api/view-tools')
    return data
}


// Activity
export const activity = async () => {
    const {data} = await $host.get('api/view-activities')
    return data
}

export const activityView = async (activityId) => {
    const {data} = await $host.get(`api/view-activity/${(activityId)}`)
    return data
}

export const addActivity = async (formData) => {
    const { data } = await $authHost.post('api/add-activity', formData);
    return data;
}

// Other
export const getGroupsSchools = async () => {
    const {data} = await $host.get(`api/get-groups-schools`)
    return data
}

export const getSubjectsEducationsAndYears = async () => {
    const {data} = await $host.get(`api/get-subjects-educations-years`)
    return data
}

export const deleteEntity = async (entityType, entityId) => {
    const {data} = await $authHost.post(`api/delete-entipy`, {entityType, entityId})
    return data
}