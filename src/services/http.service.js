import axios from 'axios'
import router from '@/router'
import authService from "./auth.service"

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT || "http://localhost/basic/web/"

let config = {
    baseURL: `${API_ENDPOINT}`
};

/** Creating the instance for axios */
const httpClient = axios.create(config)

/** Auth token interceptors */
const authInterceptor = config => {
    config.headers.Authorization = `Bearer ${authService.getToken()}`
    return config
}


/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor)

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        /** TODO: Add any response interceptors */
        return response
    },
    async error => {
        if (error.response.status === 401) {
            await authService.logout()
        }
        if (error.response.status === 403) {
            await router.push({name: 'noAccess'})
        }
        /** TODO: Do something with response error */
        return Promise.reject(error)
    }
)

export default httpClient