import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppEComm } from "../constants/colors";
import { ROUTES } from "./routers";
import {
    ICCart,
    ICCartActive,
    ICExplore,
    ICExploreActive,
    ICFullName,
    ICFullNameActive,
    ICHome,
    ICHomeActive,
    ICOffer,
    ICOfferActive
} from "../assets/icons";
import { heightPixel, widthPixel } from "../ultils/scanling";
import HomeView from "../views/HomeView";
import CustomTabBar from "./CustomNavigator/CustomTabBar";
import OfferView from "../views/OfferView";
import AccountScreen from "../views/AccountView/AccountScreen";
import AccountView from "../views/AccountView";
import CustomTabBarButton from "./CustomNavigator/CustomTabBarButton";
import ExploreScreen from "../views/ExploreView/ExploreScreen";
import CartScreen from "../views/CartView/CartScreen";

interface Props {
    openDrawer: any;
}
const Tab = createBottomTabNavigator();

function ButtonTabNavigator() {
    const navigation: Props = useNavigation();

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false, // Tắt header của Tab Screen
                tabBarShowLabel: false, //Tắt tên ở tab TabButtom
                tabBarStyle: styles.tabBarStyle,
                tabBarInactiveTintColor: AppEComm.color.dark,
                tabBarActiveTintColor: AppEComm.color.blue_001, //set color cho icon owr TabBottom
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === ROUTES.HOME) {
                        iconName = focused ? <ICHomeActive /> : <ICHome />;
                    } else if (route.name === ROUTES.EXPLORE) {
                        iconName = focused ? <ICExploreActive /> : <ICExplore />;
                    } else if (route.name === ROUTES.CART) {
                        iconName = focused ? <ICCartActive /> : <ICCart />;
                    } else if (route.name === ROUTES.OFFER) {
                        iconName = focused ? <ICOfferActive /> : <ICOffer />;
                    } else if (route.name === ROUTES.ACCOUNT) {
                        iconName = focused ? <ICFullNameActive /> : <ICFullName />;
                    }

                    return iconName;
                },
            })}
        >
            <Tab.Screen
                name={ROUTES.HOME}
                component={HomeView}
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton route="Home" {...props} />
                    ),
                }}
            />

            <Tab.Screen
                name={ROUTES.EXPLORE}
                component={ExploreScreen}
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton route="Explore" {...props} />
                    ),

                }}
            />

            <Tab.Screen
                name={ROUTES.CART}
                component={CartScreen}
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton route="Cart" {...props} />
                    ),
                }}
            />

            <Tab.Screen
                name={ROUTES.OFFER}
                component={OfferView}
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton route="Offert" {...props} />
                    ),
                }}
            />

            <Tab.Screen
                name={ROUTES.ACCOUNT}
                component={AccountView}
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton route="Account" {...props} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

export default ButtonTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: "absolute",
        backgroundColor: "transparent",
        borderTopWidth: 0,
        bottom: 15,
        right: 10,
        left: 10,
        height: 92,
    },
});
