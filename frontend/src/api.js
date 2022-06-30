const debug = process.env.NODE_ENV !== "production"

let baseURL = "https://api.oskar-rosenqvist.com"

if (debug) {
    baseURL = "http://localhost:8000"
}

const apiURL = `${baseURL}/api/`

export const API = {
    auth: {
        login: `${baseURL}/dj-rest-auth/login/`,
        logout: `${baseURL}/dj-rest-auth/logout/`,
        passwordReset: `${baseURL}/dj-rest-auth/password/reset/`,
        passwordResetConfirm: `${baseURL}/dj-rest-auth/password/reset/confirm/`,
        signup: `${baseURL}/dj-rest-auth/registration/`,
        verifyEmail: `${baseURL}/dj-rest-auth/registration/verify-email/`,
    },
    jobs: {
        list: `${apiURL}jobs/`,
        create: `${apiURL}create-job/`,
        retrieve: id => `${apiURL}jobs/${id}/`,
        update: id => `${apiURL}jobs/${id}/update/`,
        delete: id => `${apiURL}jobs/${id}/delete/`,
        sponsored_count: `${apiURL}sponsored-count/`,
    },
    payment: {
        createPayment: `${apiURL}payments/create-payment/`,
    }
}