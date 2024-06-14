import {
    AUTH_ERR_LOG_IN,
    AUTH_ERR_LOG_OUT,
    AUTH_ERR_SIGN_UP,
    AUTH_FORGOT_PASSWORD,
    AUTH_FORGOT_PASSWORD_ERROR,
    AUTH_LOGGED_IN,
    AUTH_LOGGING_IN,
    AUTH_LOGGING_OUT,
    AUTH_LOG_OUT,
    AUTH_SIGNED_UP,
    Auth_SIGNING_UP
} from "../constant/auth";

const INTIAL_STATE = {
    user: null,
    token: null,
    emailVerify: null,
    loggingIn: false,
    loggingOut: false,
    signingUp: false,
    errorMessageLogin: null,
    errorMessageLogout: null,
    errorMessageSignUp: null,
    errorMessage: null
}

export default function (state = INTIAL_STATE, action) {
    switch (action.type) {
        case AUTH_LOG_OUT: {
            return {
                ...INTIAL_STATE,
            }
        }
        case AUTH_LOGGING_IN: {
            return {
                ...state,
                errorMessageLogin: action.payload ? null : state.errorMessageLogin,
                errorMessageLogout: null,
                loggingIn: action.payload,
            }
        }
        case AUTH_LOGGING_OUT: {
            return {
                ...state,
                errorMessageLogout: action.payload ? null : state.errorMessageLogout,
                loggingOut: action.payload,
            }
        }
        case AUTH_LOGGED_IN: {
            let { user, token } = action.payload
            return {
                ...state,
                user,
                token,
                errorMessageLogin: null,
                loggingIn: false,
            }
        }
        case AUTH_ERR_LOG_IN: {
            return {
                ...state,
                loggingIn: false,
                errorMessageLogin: action.payload,
            }
        }
        case AUTH_ERR_LOG_OUT: {
            return {
                ...state,
                loggingOut: false,
                errorMessageLogout: action.payload,
            }
        }
        case Auth_SIGNING_UP: {
            return {
                ...state,
                errorMessageSignUp: action.payload ? null : state.errorMessageSignUp,
                signingUp: action.payload,
            }
        }
        case AUTH_SIGNED_UP: {
            let { user, token } = action.payload
            return {
                ...state,
                user,
                token,
                signingUp: false,
                errorMessageSignUp: null,
            }
        }
        case AUTH_ERR_SIGN_UP: {
            return {
                ...state,
                signingUp: false,
                errorMessageSignUp: action.payload,
            }
        }
        case AUTH_FORGOT_PASSWORD: {
            // let { emailVerify } = action.payload
            return {
                ...state,
                emailVerify: action.payload
            }
        }
        case AUTH_FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                errorMessage: action.payload,
            }
        }
        default:
            return state;
    }
}