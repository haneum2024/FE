import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import Camera from './src/pages/Camera';
import MyInfo from './src/pages/MyInfo';
import Home from './src/pages/Home';
import CameraGuide from './src/pages/AddDogProfilePages/CameraGuide';
import DogInfo from './src/pages/AddDogProfilePages/DogInfo';
import DogProfileResult from './src/pages/AddDogProfilePages/DogProfileResult';
import ProfileInfo from './src/pages/AddDogProfilePages/ProfileInfo';
import colorType from './src/styles/color';

import HomeIcon from './src/components/Icons/HomeIcon';
import HealthIcon from './src/components/Icons/HealthIcon';
import MissFoundIcon from './src/components/Icons/MissFoundIcon';
import ProfileIcon from './src/components/Icons/ProfileIcon';
import {AddDogPageNavigation} from './types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<AddDogPageNavigation>();

const HomeTabBarIcon = ({color}: {color: string}) => (
  <HomeIcon width={25} height={25} fill={color} />
);

const HealthTabBarIcon = ({color}: {color: string}) => (
  <HealthIcon width={25} height={25} fill={color} />
);

const MissFoundTabBarIcon = ({color}: {color: string}) => (
  <MissFoundIcon width={25} height={25} fill={color} stroke={color} />
);

const ProfileTabBarIcon = ({color}: {color: string}) => (
  <ProfileIcon width={25} height={25} fill={color} />
);

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colorType.white},
      }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="CameraGuide" component={CameraGuide} />
      <Stack.Screen name="DogInfo" component={DogInfo} />
      <Stack.Screen name="DogProfileResult" component={DogProfileResult} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    </Stack.Navigator>
  );
};

function AppInner() {
  const tabBarActiveTintColor = colorType.blue[600];
  const tabBarInactiveTintColor = colorType.gray[300];

  const getTabBarVisibility = (route: RouteProp<ParamListBase, string>) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (
      routeName === 'CameraGuide' ||
      routeName === 'DogInfo' ||
      routeName === 'DogProfileResult'
    ) {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
        tabBarStyle: {
          display: getTabBarVisibility(route) ? 'flex' : 'none',
          height: 60,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: '홈',
          tabBarIcon: HomeTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Health"
        component={Camera}
        options={{
          title: '건강 일지',
          tabBarIcon: HealthTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          title: '실종/발견 신고',
          tabBarIcon: MissFoundTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          title: '내 정보',
          tabBarIcon: ProfileTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
  },
  tabBarLabel: {
    marginBottom: 6,
  },
});

export default AppInner;
