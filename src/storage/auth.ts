import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('Failed to fetch access token from AsyncStorage', error);
    return null;
  }
};

export const saveAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Failed to save access token to AsyncStorage', error);
  }
};

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Failed to remove access token from AsyncStorage', error);
  }
};
