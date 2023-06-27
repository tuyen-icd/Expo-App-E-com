import { DO_LOGIN, DO_REGISTER, SUCCESS } from "./ActionTypes";


//LOGIN
export const doLoginAction = (
    userName,
    password,
    callback = (error, data) => { }
) => ({
    type: DO_LOGIN,
    userName: userName,
    password: password,
    callback,
})

export const getLoginSuccess = (payload) => {
    return {
        type: DO_LOGIN + SUCCESS,
        payload,
    }
}

//REGISTER
// interface doRegisterActionProps {
//     name?: string;
//     email?: string;
//     phone?: string;
//     password?: string;
//     password_confirmation?: string;
// }

export const doRegisterAction = (userData, callback = (error, data) => { }) => {
    return {
        type: DO_REGISTER,
        userData: userData,
        callback,
    };
};