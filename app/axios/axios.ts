import axios from 'axios'

const apiBaseURL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    validateStatus: function (status) {
        return status <= 210
    },
})