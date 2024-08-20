import messaging from '@react-native-firebase/messaging';

export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();

  return fcmToken;
};
