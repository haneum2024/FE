import AsyncStorage from '@react-native-async-storage/async-storage';

// 세션 정보를 저장하는 키
const SESSION_KEY = '@MyApp:session';

// 세션 정보를 AsyncStorage에 저장하는 함수
export const storeSession = async (sessionData: any) => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to store session:', error);
  }
};

// AsyncStorage에서 세션 정보를 로드하는 함수
export const loadSession = async () => {
  try {
    const sessionData = await AsyncStorage.getItem(SESSION_KEY);
    return sessionData != null ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Failed to load session:', error);
    return null;
  }
};

// AsyncStorage에서 세션 정보를 삭제하는 함수
export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};
