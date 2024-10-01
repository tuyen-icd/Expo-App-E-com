import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from "expo-checkbox";
import React, { useState } from 'react';
import {
    fontPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
} from '../../ultils/scanling';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ICFullName, ICFullNameActive, ICLogo, IcPhone, IcPhoneActive } from '../../assets/icons';
import { styles } from '../LoginView/styles';
import TxtInput from '../../components/Inputs/components/TxtInput';
import InputEmail from '../../components/Inputs/InputEmail';
import InputPassword from '../../components/Inputs/InputPassword';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { AppEComm } from '../../constants/colors';
import { ROUTES } from '../../navigations/routers';
import { ShowError } from '../../ultils/Alert';
import {
    checkValidateEmail,
    checkValidatePassword,
    checkValidatePhone,
    checkValidateRetypePassword,
    checkValidateStringField
} from '../../ultils/CheckValidateInput';
import { useDispatch } from 'react-redux';
import { doRegisterAction } from '../../redux/actions/AuthAction';
import Loader from '../../components/Loader';
import axios from 'axios';


const RegisterForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [registerState, setRegisterState] = useState({
        fullName: { value: '', error: null as null | { message: string } },
        phoneNumber: { value: '', error: null as null | { message: string } },
        email: { value: '', error: null as null | { message: string } },
        password: { value: '', error: null as null | { message: string } },
        retypePassword: { value: '', error: null as null | { message: string } },
        isChecked: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const checkValidateFormSigup = () => {
        const errorFullName = checkValidateStringField(
            registerState.fullName.value
        );
        const errorPhoneNumber = checkValidatePhone(
            registerState.phoneNumber.value
        );
        const errorEmail = checkValidateEmail(registerState.email.value);
        const errorPassword = checkValidatePassword(registerState.password.value);
        const errorRetypePassword = checkValidateRetypePassword(
            registerState.password.value,
            registerState.retypePassword.value
        );
        const checkBoxError = !registerState.isChecked;
        // console.log("checkBoxError :>> ", checkBoxError);

        setRegisterState({
            ...registerState,
            fullName: {
                value: registerState.fullName.value,
                error: errorFullName,
            },
            phoneNumber: {
                value: registerState.phoneNumber.value,
                error: errorPhoneNumber,
            },
            email: {
                value: registerState.email.value,
                error: errorEmail,
            },
            password: {
                value: registerState.password.value,
                error: errorPassword,
            },
            retypePassword: {
                value: registerState.retypePassword.value,
                error: errorRetypePassword,
            },
            isChecked: registerState.isChecked,
        });

        if (
            errorFullName ||
            errorPhoneNumber ||
            errorEmail ||
            errorPassword ||
            errorRetypePassword
        ) {
            return false;
        } else {
            if (checkBoxError) {
                ShowError("You need to agree to the privacy policy");
                return false;
            }
        }
        // navigation.navigate(ROUTES.LOGIN as never, {register: 'registerScreen', userName: registerState.userName.value } as never);
        return true;
    };

    const onRegisterPressed = () => {
        if (checkValidateFormSigup()) {
            registerAction();
        }
    };

    const registerAction = async () => {
        console.log("ping_go");
        setIsLoading(true);
        try {
            const useData = axios.post("http://localhost:3000/users_app", {
                "name": registerState.fullName.value,
                "email": registerState.email.value,
                "phone": registerState.phoneNumber.value,
                "password": registerState.password.value,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res: any) => {
                console.log("res", res);
                if (res._id !== 0) {
                    console.log("pinggo-1");
                    setIsLoading(false);
                    ShowError("Register Account Successful", () => navigation.goBack());
                } else {
                    setIsLoading(false);
                    console.log("PING_GO2");
                    ShowError("Error", res.message);
                }
            }).catch((error) => {
                setIsLoading(false);
                ShowError(error.message);
            } );
        } catch (error) {
            console.log("PING_GO3");
            setIsLoading(false);
            console.error(error);
        }

    }

    // const registerAction = () => {
    //     setIsLoading(true)

    //     const userData = {
    //         name: registerState.fullName.value,
    //         email: registerState.email.value,
    //         phone: registerState.phoneNumber.value,
    //         password: registerState.password.value,
    //         password_confirmation: registerState.retypePassword.value,
    //     };
    //     dispatch(
    //         doRegisterAction(userData, (error, data) => {
    //             if (data) {
    //                 if (!Array.isArray(data.errors) || !data.errors.length) {
    //                     console.log("registerData ==", data);
    //                     ShowError(data.message, () => {
    //                         backToLogin();
    //                     });
    //                     return;
    //                 }
    //                 ShowError(data.errors[0]);
    //             }
    //             if (error) {
    //                 ShowError(error);
    //                 console.log("Register Error ==", error);
    //             }
    //             setIsLoading(false);
    //         })
    //     );
    // };

    const backToLogin = () => {
        navigation.navigate(ROUTES.LOGIN as never);
    };

    return (
        <View
            style={{
                backgroundColor: AppEComm.color.white,
                width: '100%',
                height: '100%',
                paddingHorizontal: pixelSizeHorizontal(16),
            }}>
            <KeyboardAwareScrollView>

                <View style={{ marginTop: pixelSizeVertical(155) }}>
                    <View style={styles.logo}>
                        <ICLogo />
                    </View>
                    <Text style={styles.title}>Let’s Get Started</Text>
                    <Text
                        style={{
                            color: AppEComm.color.placeholderColor,
                            letterSpacing: 0.5,
                            fontSize: fontPixel(12),
                            fontWeight: '400',
                            textAlign: 'center',
                            paddingBottom: 28,
                        }}>
                        Create an new account
                    </Text>
                </View>
                <View>
                    <TxtInput
                        placeholder="Full Name"
                        error={registerState.fullName.error}
                        value={registerState.fullName.value}
                        leftComponent={(valueIsNotEmpty, styles) =>
                            valueIsNotEmpty ? (
                                <ICFullNameActive {...styles} />
                            ) : (
                                <ICFullName {...styles} />
                            )
                        }
                        onChangeText={text => {
                            setRegisterState({
                                ...registerState,
                                fullName: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                    />

                    <TxtInput
                        placeholder="Phone Number"
                        error={registerState.phoneNumber.error}
                        value={registerState.phoneNumber.value}
                        leftComponent={(valueIsNotEmpty, styles) =>
                            valueIsNotEmpty ? (
                                <IcPhoneActive {...styles} />
                            ) : (
                                <IcPhone {...styles} />
                            )
                        }
                        keyboardType="phone-pad"
                        onChangeText={(text) => {
                            setRegisterState({
                                ...registerState,
                                phoneNumber: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                    />

                    <InputEmail
                        placeholder="Email"
                        value={registerState.email.value}
                        error={registerState.email.error}
                        onChangeText={(text) => {
                            setRegisterState({
                                ...registerState,
                                email: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        keyboardType="email-address"
                    />

                    <InputPassword
                        placeholder="Password"
                        error={registerState.password.error}
                        onChangeText={(text) => {
                            setRegisterState({
                                ...registerState,
                                password: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        value={registerState.password.value}
                    />

                    <InputPassword
                        placeholder="Password Again"
                        error={registerState.retypePassword.error}
                        onChangeText={(text) => {
                            setRegisterState({
                                ...registerState,
                                retypePassword: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        value={registerState.retypePassword.value}
                    />

                    <View style={styles.section}>
                        <Checkbox
                            style={styles.isChecked}
                            value={registerState.isChecked}
                            onValueChange={(value) => {
                                setRegisterState({
                                    ...registerState,
                                    isChecked: value,
                                });
                            }}
                            color={
                                registerState.isChecked ? AppEComm.color.placeholderColor : undefined
                            }
                        />
                        <Text
                            style={{
                                color: AppEComm.color.placeholderColor,
                                fontSize: fontPixel(14),
                                fontWeight: '700'
                            }}>
                            I Agree to Privacy Policy
                        </Text>
                    </View>

                    <View style={{ marginTop: -20 }}>
                        <Button
                            text="Sign Up"
                            buttonSize="Medium"
                            onPress={() => onRegisterPressed()}
                        />
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                    }}>
                    <Text
                        style={[
                            styles.txtForgotPassword,
                            {
                                fontWeight: '400',
                                color: AppEComm.color.placeholderColor,
                            },
                        ]}>
                        Have a account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN as never)}>
                        <Text style={styles.txtForgotPassword}> Sign in</Text>
                    </TouchableOpacity>
                </View>
                <Loader isVisible={isLoading} />
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RegisterForm;
