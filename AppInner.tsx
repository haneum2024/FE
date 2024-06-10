import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import {RootState} from './src/store/reducer';
// import useSocket from './src/hooks/useSocket';
// import {useEffect} from 'react';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import axios from 'axios';
// import {Alert} from 'react-native';
// import userSlice from './src/slices/user';
// import {useAppDispatch} from './src/store';
// import Config from 'react-native-config';
// import orderSlice from './src/slices/order';
// import usePermissions from './src/hooks/usePermissions';
// import SplashScreen from 'react-native-splash-screen';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Camera from './src/pages/Camera';
import MyInfo from './src/pages/MyInfo';
import Home from './src/pages/Home';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  // usePermissions();

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  // useEffect(() => {
  //   const getTokenAndRefresh = async () => {
  //     try {
  //       const token = await EncryptedStorage.getItem('refreshToken');
  //       if (!token) {
  //         SplashScreen.hide();
  //         return;
  //       }
  //       const response = await axios.post(
  //         `${Config.API_URL}/refreshToken`,
  //         {},
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       dispatch(
  //         userSlice.actions.setUser({
  //           name: response.data.data.name,
  //           email: response.data.data.email,
  //           accessToken: response.data.data.accessToken,
  //         }),
  //       );
  //     } catch (error) {
  //       console.error(error);
  //       if (axios.isAxiosError(error)) {
  //         if (error.response?.data.code === 'expired') {
  //           Alert.alert('알림', '다시 로그인 해주세요.');
  //         }
  //       }
  //     } finally {
  //       SplashScreen.hide();
  //     }
  //   };
  //   getTokenAndRefresh();
  // }, [dispatch]);

  // useEffect(() => {
  //   const callback = (data: any) => {
  //     console.log(data);
  //     dispatch(orderSlice.actions.addOrder(data));
  //   };
  //   if (socket && isLoggedIn) {
  //     socket.emit('acceptOrder', 'hello');
  //     socket.on('order', callback);
  //   }
  //   return () => {
  //     if (socket) {
  //       socket.off('order', callback);
  //     }
  //   };
  // }, [dispatch, isLoggedIn, socket]);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     console.log('!isLoggedIn', !isLoggedIn);
  //     disconnect();
  //   }
  // }, [isLoggedIn, disconnect]);

  // useEffect(() => {
  //   axios.interceptors.response.use(
  //     response => {
  //       return response;
  //     },
  //     async error => {
  //       const {
  //         config,
  //         response: {status},
  //       } = error;
  //       if (status === 419) {
  //         if (error.response.data.code === 'expired') {
  //           const originalRequest = config;
  //           const refreshToken = await EncryptedStorage.getItem('refreshToken');
  //           // token refresh 요청
  //           const {data} = await axios.post(
  //             `${Config.API_URL}/refreshToken`, // token refresh api
  //             {},
  //             {headers: {authorization: `Bearer ${refreshToken}`}},
  //           );
  //           // 새로운 토큰 저장
  //           dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
  //           originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
  //           // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
  //           return axios(originalRequest);
  //         }
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
  // }, [dispatch]);

  // 토큰 설정
  // useEffect(() => {
  //   async function getToken() {
  //     try {
  //       if (!messaging().isDeviceRegisteredForRemoteMessages) {
  //         await messaging().registerDeviceForRemoteMessages();
  //       }
  //       const token = await messaging().getToken();
  //       console.log('phone token', token);
  //       dispatch(userSlice.actions.setPhoneToken(token));
  //       return axios.post(`${Config.API_URL}/phonetoken`, {token});
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getToken();
  // }, [dispatch]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          // tabBarIcon: ({color}) => (
          //   <FontAwesome name="gear" size={20} style={{color}} />
          // ),
          tabBarActiveTintColor: 'blue',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Health"
        component={Camera}
        options={{
          title: '건강 일지',
          // tabBarIcon: ({color}) => (
          //   <FontAwesome name="gear" size={20} style={{color}} />
          // ),
          tabBarActiveTintColor: 'blue',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          title: '실종/발견 신고',
          // tabBarIcon: ({color}) => (
          //   <FontAwesome name="gear" size={20} style={{color}} />
          // ),
          tabBarActiveTintColor: 'blue',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          title: '내 정보',
          // tabBarIcon: ({color}) => (
          //   <FontAwesome name="gear" size={20} style={{color}} />
          // ),
          tabBarActiveTintColor: 'blue',
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppInner;
