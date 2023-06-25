import { createStackNavigator } from "@react-navigation/stack";
import { AppEComm } from "../constants/colors";
import { ROUTES } from "./routers";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import FlashSaleView from "../views/FlashSaleView";
import ProductDetail from "../views/ProductView/ProductDetail";
import ReviewScreen from "../views/ReviewView/ReviewScreen";
import WriteReviewScreen from "../views/ReviewView/WriteReviewScreen";
import ExploreView from "../views/ExploreView";
import ButtonTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
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
        name={ROUTES.EXPLORE}
        component={ExploreView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
