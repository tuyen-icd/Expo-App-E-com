import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import { SkeletonContainer } from "@nlazzos/react-native-skeleton";
import { AppEComm } from './src/constants/colors';

export default function App() {
  return (
    <SkeletonContainer backgroundColor={AppEComm.color.borderColor}>
      <Provider store={store}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </Provider>
    </SkeletonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
