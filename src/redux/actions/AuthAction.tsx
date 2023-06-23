import { FC } from "react";
import { DO_LOGIN, DO_REGISTER, SUCCESS } from "./ActionTypes";


//LOGIN
export const doLoginAction = (
    userName: string,
    password: string,
    callback = (error: any, data: any) => { }
) => ({
    type: DO_LOGIN,
    userName: userName,
    password: password,
    callback,
})

export const getLoginSuccess = (payload: { dataUser: any }) => {
    return {
        type: DO_LOGIN + SUCCESS,
        payload,
    }
}

//REGISTER
interface doRegisterActionProps {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
}

export const doRegisterAction = (userData?: doRegisterActionProps, callback = (error: any, data: any) => { }) => {
    return {
        type: DO_REGISTER,
        userData: userData,
        callback,
    };
};