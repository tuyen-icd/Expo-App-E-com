import { createStackNavigator } from "@react-navigation/stack";
import { AppEComm } from "../constants/colors";
import { ROUTES } from "./routers";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import FlashSaleView from "../views/FlashSaleView";
import ProductDetail from "../views/ProductView/ProductDetail";
import ReviewScreen from "../views/ReviewView/ReviewScreen";
import WriteReviewScreen from "../views/ReviewView/WriteReviewScreen";
import ButtonTabNavigator from "./BottomTabNavigator";
import ExploreSearch from "../views/ExploreView/ExploreSearch";
import ShiptoScreen from "../views/CartView/components/ShipToScreen";
import AddressShip from "../views/CartView/components/AddressShipScreen";
import PaymentScreen from "../views/CartView/components/PaymentScreen";
import ChooseCard from "../views/CartView/components/ChooseCard";
import OrderSuccess from "../views/CartView/components/OrderSuccess";
import ProfileScreen from "../views/AccountView/components/ProfileScreen";
import ProfileName from "../views/AccountView/components/ProfileName";
import ProfileGender from "../views/AccountView/components/ProfileGender";
import ProfileBrithday from "../views/AccountView/components/ProfileBrithday";
import ProfileEmail from "../views/AccountView/components/ProfileEmail";
import ProfilePhone from "../views/AccountView/components/ProfilePhone";
import ProfileChangePassword from "../views/AccountView/components/ProfileChangePassword";
import ProductsOfCategory from "../components/ProductOfCategoryScreen/ProductsOfCategory";
import FavoriteView from "../views/FavoriteView";
import Credentials from "../repos/local/Credentials";
import { setSessionToken } from "../configs";
import { useDispatch } from "react-redux";
import { checkTokenAction } from "../redux/actions/AuthAction";
import { useEffect } from "react";
import OrderScreen from "../views/OrderView/OrderScreen";
import NotificationView from "../views/NotificationView";
import NotificationDetail from "../views/NotificationView/NotificationDetail";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleCheckTokenProcess();
  });

  const handleCheckTokenProcess = () => {
    Credentials.loadTokenToStorage().then((token) => {
      if (token && token.length > 0) {
        console.log("Saved token available");
        setSessionToken(token);
        dispatch(
          checkTokenAction((error, data) => {
            if (error) {
              console.log("Validate token failure");
            }
          })
        );
      }
    });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: AppEComm.color.white,
        headerStyle: {
          backgroundColor: AppEComm.color.red,
        },
        headerBackTitleVisible: false,
      }}
      initialRouteName={ROUTES.LOGIN}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={ButtonTabNavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.FLASHSALE}
        component={FlashSaleView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PRODUCT_DETAIL}
        component={ProductDetail}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.REVIEW}
        component={ReviewScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.WRITE_REVIEW}
        component={WriteReviewScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.EXPLORE_SEARCH}
        component={ExploreSearch}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PRODUCTS_CATEGORY}
        component={ProductsOfCategory}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.SHIP_TO}
        component={ShiptoScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.ADDRESS_SHIP}
        component={AddressShip}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PAYMENT}
        component={PaymentScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.CHOOSE_CARD}
        component={ChooseCard}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.ORDER_SUCCESS}
        component={OrderSuccess}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_NAME}
        component={ProfileName}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_GENDER}
        component={ProfileGender}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_BIRTH_DAY}
        component={ProfileBrithday}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_EMAIL}
        component={ProfileEmail}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_PHONE}
        component={ProfilePhone}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE__CHANGE_PASSWORD}
        component={ProfileChangePassword}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.FAVORITE_PRODUCT}
        component={FavoriteView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.NOTIFICATION}
        component={NotificationView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.NOTIFICATION_DETAIL}
        component={NotificationDetail}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.ORDER_ACCOUNT}
        component={OrderScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
