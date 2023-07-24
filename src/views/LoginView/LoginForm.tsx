import { Alert, Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../ultils/scanling";
import { AppEComm } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICFacebook, ICGoogle, ICLogo } from "../../assets/icons";
import { styles } from "./styles";
import InputEmail from "../../components/Inputs/InputEmail";
import InputPassword from "../../components/Inputs/InputPassword";
import Button from "../../components/Button/Button";
import Spacer from "../../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";
import { useDispatch } from "react-redux";
import {
  checkValidateEmail,
  checkValidatePassword,
} from "../../ultils/CheckValidateInput";
import { ShowError } from "../../ultils/Alert";
import { doLoginAction } from "../../redux/actions/AuthAction";
import Loader from "../../components/Loader";
// import AsyncStorage from "@react-native-async-storage/async-storage";
interface LoginFormProps {
  route: any;
}

const LoginForm: FC<LoginFormProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  // const [userToken, setUserToken] = useState<any>(null);
  const [loginFormState, setLoginFormState] = useState({
    userName: { value: "", error: null as null | { message: string } },
    password: { value: "", error: null as null | { message: string } },
  });
  const [isLoading, setIsLoading] = useState(false);

  // useLayoutEffect(() => {
  //   checkToken();
  // }, [])

  // const checkToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     navigation.navigate(ROUTES.HOME as never, { flag: true } as never);
  //     setUserToken(token);
  //   } catch (error) {
  //     console.log('Error retrieving token:', error);
  //   }
  // };

  useEffect(() => {
    if (route?.params?.register === "registerScreen") {
      setLoginFormState({
        ...loginFormState,
        userName: {
          value: route.params.userName,
          error: null,
        },
        password: {
          value: "",
          error: null,
        },
      });
    }
  }, [route?.params]);

  const checkValidateFormLogin = () => {
    const errorEmail = checkValidateEmail(loginFormState.userName.value);
    const errorPassword = checkValidatePassword(loginFormState.password.value);

    if (errorEmail !== null || errorPassword !== null) {
      setLoginFormState({
        ...loginFormState,
        userName: {
          value: loginFormState.userName.value,
          error: errorEmail,
        },
        password: {
          value: loginFormState.password.value,
          error: errorPassword,
        },
      });
    } else {
      Keyboard.dismiss();
      onSignInPress(
        loginFormState.userName.value,
        loginFormState.password.value
      );
    }
  };

  const onSignInPress = (userName: string, password: string) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      dispatch(
        doLoginAction(userName, password, (error, data) => {
          if (data && data.success && data.status == 200) {
            navigation.navigate(ROUTES.HOME as never, { flag: true } as never);
          }
          if (error) {
            ShowError(error.message);
          }
          setIsLoading(false);
        })
      );
    } catch (error) {
      Alert.alert("Oops! Email or Password ");
    }
  };

  return (
    <View
      style={{
        backgroundColor: AppEComm.color.white,
        width: "100%",
        height: "100%",
        paddingHorizontal: pixelSizeHorizontal(16),
      }}
    >
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: pixelSizeVertical(112),
          }}
        >
          <View style={styles.logo}>
            <ICLogo />
          </View>
          <Text style={styles.title}>Welcome to E-com</Text>
          <Text
            style={{
              color: AppEComm.color.placeholderColor,
              letterSpacing: 0.5,
              fontSize: fontPixel(12),
              fontWeight: "400",
              textAlign: "center",
              paddingBottom: 28,
            }}
          >
            Sign in to continue
          </Text>
        </View>
        <InputEmail
          placeholder="Email"
          value={loginFormState.userName.value}
          error={loginFormState.userName.error}
          onChangeText={(text) => {
            setLoginFormState({
              ...loginFormState,
              userName: {
                value: text,
                error: null,
              },
            });
          }}
        />
        <InputPassword
          placeholder="Password"
          error={loginFormState.password.error}
          onChangeText={(text) => {
            setLoginFormState({
              ...loginFormState,
              password: {
                value: text,
                error: null,
              },
            });
          }}
          value={loginFormState.password.value}
        />

        <Button
          text="Sign In"
          buttonSize="Medium"
          onPress={() => checkValidateFormLogin()}
        />

        <View
          style={{
            paddingTop: 30,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={styles.line} />
          <Text
            style={{
              color: AppEComm.color.placeholderColor,
              letterSpacing: 0.5,
              fontSize: fontPixel(14),
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            OR
          </Text>
          <View style={styles.line} />
        </View>

        <View>
          <TouchableOpacity
            style={{
              borderColor: "#EBF0FF",
              borderWidth: 1,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <ICGoogle />
            <Text
              style={[
                styles.txt,
                { flex: 1, alignItems: "center", justifyContent: "center" },
              ]}
            >
              Login with Google
            </Text>
          </TouchableOpacity>
          <Spacer height={8} />
          <TouchableOpacity
            style={{
              borderColor: "#EBF0FF",
              borderWidth: 1,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <ICFacebook />
            </View>
            <Text
              style={[
                styles.txt,
                { flex: 1, alignItems: "center", justifyContent: "center" },
              ]}
            >
              Login with Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("Forgot Password")}>
          <Text
            style={[
              styles.txtForgotPassword,
              {
                paddingTop: 16,
                paddingBottom: 8,
              },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.txtForgotPassword,
              {
                fontWeight: "400",
                color: AppEComm.color.placeholderColor,
              },
            ]}
          >
            Don't have a account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER as never)}
          >
            <Text style={styles.txtForgotPassword}> Register</Text>
          </TouchableOpacity>
        </View>
        <Loader isVisible={isLoading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginForm;
