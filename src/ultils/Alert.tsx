import { Alert } from 'react-native';

export const ShowError = (error: any, onOk = () => { }) => {
  if (!error) {
    return;
  }
  let message = '';

  if (typeof error === 'string') {
    message = error;
  } else {
    message = error.message;
  }
  Alert.alert('E-COM-APP', message, [{ text: 'OK', onPress: () => onOk() }]);
};
