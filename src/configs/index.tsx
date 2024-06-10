export const API_LOGIN = "https://dummyjson.com/auth/login";
export const API_REGISTER = "https://apingweb.com/api/register";
export const API_ADD_REVIEW = "https://dummyjson.com/comments/add";
export const API_FLASH_SALE =
  "https://dummyjson.com/products?limit=10&skip=35&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images";
export const API_MEGA_SALE =
  "https://dummyjson.com/products?limit=10&skip=80&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images";
export const API_SLIDER =
  "https://dummyjson.com/products?limit=5&skip=1&select=thumbnail";
export const API_ALL_CATEGORY = "https://dummyjson.com/products/category-list";
export const API_PRODUCT_BOTTOM_HOME =
  "https://dummyjson.com/products?limit=10&skip=32&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images";

let SESSION_TOKEN = "";

export function setSessionToken(sessionToken: any) {
  SESSION_TOKEN = sessionToken;
}
export function getSessionToken() {
  return SESSION_TOKEN;
}

import axios from "axios";
import { Alert } from "react-native";

const API_TEST_APP = "http://localhost:5001";

// export const getCustomers = async() => {
//     try {
//         const response = await axios.get(`${API_TEST_APP}/getallcustomers`);
//         return response.data;
//     } catch (error) {
//         console.log("error", error);
//         throw error;
//     }
// }

export const notificationTestApp = async () => {
  try {
    const response = await axios.post(`${API_TEST_APP}/user/post-notification`);
    console.log("response_notificationTestApp", response);
    if (response.data.success) {
      return response.data;
    } else {
      Alert.alert("Error", response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getNotification = async () => {
  try {
    const response = await axios.get(`${API_TEST_APP}/user/get-notification`);
    if (response.data.success) {
      return response.data;
    }
    // return response.sc;
  } catch (error) {
    console.error(error);
  }
};
