import { doctorServices } from "../../services/doctorAuth";
import { navigate } from "../../services/navRef";
import { userServices } from "../../services/userAuth";
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


export const loggingIn = (loggingIn) => ({
    type: AUTH_LOGGING_IN,
    payload: loggingIn,
})

export const loggedIn = (data) => ({
    type: AUTH_LOGGED_IN,
    payload: data
})

export const errorLogIn = (errorMessage) => ({
    type: AUTH_ERR_LOG_IN,
    payload: errorMessage,
})

export const login = (username, password, isdoctor) => (dispatch) => {
    dispatch(loggingIn(true));

    console.log(isdoctor);
    isdoctor ?
        doctorServices.Login(username, password).then(async (res) => {
            await dispatch(loggedIn(res.data));
            navigate('DoctorHome')
        }).catch((err) => {
            console.log(err.response);
            dispatch(errorLogIn(err.response.data.error))
        }).finally(() => {
            dispatch(loggingIn(false));
        })
        :
        userServices.Login(username, password).then(async (res) => {
            await dispatch(loggedIn(res.data));
            navigate('BottomTab')
        }).catch((err) => {
            console.log(err.response);
            dispatch(errorLogIn(err.response.data.error))
        }).finally(() => {
            dispatch(loggingIn(false));
        })
}

export const loggingOut = (loggingOut) => ({
    type: AUTH_LOGGING_OUT,
    payload: loggingOut,
})

export const loggedOut = () => ({
    type: AUTH_LOG_OUT,
});

export const errorLogOut = (errorMessage) => ({
    type: AUTH_ERR_LOG_OUT,
    payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
    dispatch(loggingOut(true))
    await userServices.Logout(getState).then((res) => {
        dispatch(loggedOut())
    }).catch((err) => {
        // console.log(err.response);
        dispatch(errorLogOut('Error logging out'));
    }).finally(() => {
        dispatch(loggingOut(false))
    });
};

export const signingUp = (signingUp) => ({
    type: Auth_SIGNING_UP,
    payload: signingUp
})

export const signedUp = (data) => ({
    type: AUTH_SIGNED_UP,
    payload: data
})

export const errorSignUp = (errormessage) => ({
    type: AUTH_ERR_SIGN_UP,
    payload: errormessage
})

export const Signup = (username, email, password, isdoctor) => (dispatch) => {
    dispatch(signingUp(true))

    isdoctor ?
        doctorServices.Signup(username, email, password).then(async (res) => {
            await dispatch(signedUp(res.data));
            navigate('DoctorCompleteProfile')
        }).catch((err) => {
            dispatch(errorSignUp(err.response.data.error))
        }).finally(() => {
            dispatch(loggingIn(false));
        })
        :
        userServices.Signup(username, email, password).then(async (res) => {
            await dispatch(signedUp(res.data));
            navigate('CompleteProfile')
        }).catch((err) => {
            dispatch(errorSignUp(err.response.data.error))
        }).finally(() => {
            dispatch(loggingIn(false));
        })
}

export const errorForgotPassword = (errormessage) => ({
    type: AUTH_FORGOT_PASSWORD_ERROR,
    payload: errormessage
})

export const Forgot_Password = (data) => ({
    type: AUTH_FORGOT_PASSWORD,
    payload: data
})

export const ForgotPassword = (email) => (dispatch) => {
    userServices.ForgotPassword(email).then(async (res) => {
        dispatch(Forgot_Password(email))
        navigate('VerifyAccount')
    }).catch((err) => {
        dispatch(errorForgotPassword(err.response.data.error))
    })
}

export const Verify = (email, token) => (dispatch) => {
    userServices.VerifyToken(email, token).then(async (res) => {
        navigate('BottomTab')
    }).catch((err) => {
        dispatch(errorForgotPassword(err.response.data.error))
    })
}