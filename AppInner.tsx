import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert, BackHandler} from 'react-native';
import Camera from './src/pages/Camera';
import MyInfo from './src/pages/MyInfo';
import Home from './src/pages/Home';

const Tab = createBottomTabNavigator();

function AppInner() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        '앱 종료',
        '정말로 앱을 종료하시겠습니까?',
        [
          {text: '취소', onPress: () => null, style: 'cancel'},
          {text: '확인', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
