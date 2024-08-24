import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import Health from './src/pages/Health';
import MissFound from './src/pages/MissFoundPages/MissFound';
import MyInfo from './src/pages/MyInfo';
import Home from './src/pages/Home';
import CameraGuide from './src/pages/AddDogProfilePages/CameraGuide';
import DogInfo from './src/pages/AddDogProfilePages/DogInfo';
import DogProfileResult from './src/pages/AddDogProfilePages/DogProfileResult';
import DogNoseCamera from './src/pages/AddDogProfilePages/DogNoseCamera';
import ProfileInfo from './src/pages/AddDogProfilePages/ProfileInfo';
import Found from './src/pages/MissFoundPages/Found';
import FoundCameraGuide from './src/pages/MissFoundPages/FoundCameraGuide';
import FoundDogNoseCamera from './src/pages/MissFoundPages/FoundDogNoseCamera';
import FoundPost from './src/pages/MissFoundPages/FoundPost';
import FoundResultFail from './src/pages/MissFoundPages/FoundResultFail';
import FoundResultSuccess from './src/pages/MissFoundPages/FoundResultSuccess';
import Miss from './src/pages/MissFoundPages/Miss';
import MissPost from './src/pages/MissFoundPages/MissPost';
import colorType from './src/styles/color';

import HomeIcon from './src/components/Icons/HomeIcon';
import HealthIcon from './src/components/Icons/HealthIcon';
import MissFoundIcon from './src/components/Icons/MissFoundIcon';
import ProfileIcon from './src/components/Icons/ProfileIcon';
import {
  AddDogPageNavigation,
  HealthPageNavigation,
  MainPageNavigation,
  ReportDogPageNavigation,
} from './types/navigation';
import Notification from './src/pages/Notification';

const Tab = createBottomTabNavigator<MainPageNavigation>();
const AddDogStack = createStackNavigator<AddDogPageNavigation>();
const ReportDogStack = createStackNavigator<ReportDogPageNavigation>();
const HealthDogStack = createStackNavigator<HealthPageNavigation>();

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
    <AddDogStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colorType.white},
      }}>
      <AddDogStack.Screen name="HomeMain" component={Home} />
      <AddDogStack.Screen name="CameraGuide" component={CameraGuide} />
      <AddDogStack.Screen name="DogInfo" component={DogInfo} />
      <AddDogStack.Screen
        name="DogProfileResult"
        component={DogProfileResult}
      />
      <AddDogStack.Screen name="DogNoseCamera" component={DogNoseCamera} />
      <AddDogStack.Screen name="ProfileInfo" component={ProfileInfo} />
      <AddDogStack.Screen name="Notification" component={Notification} />
      <ReportDogStack.Screen name="MissFoundMain" component={MissFound} />
      <ReportDogStack.Screen name="Miss" component={Miss} />
      <ReportDogStack.Screen name="MissPost" component={MissPost} />
      <ReportDogStack.Screen name="Found" component={Found} />
    </AddDogStack.Navigator>
  );
};

const MissFoundStack = () => {
  return (
    <ReportDogStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colorType.white},
      }}>
      <ReportDogStack.Screen name="MissFoundMain" component={MissFound} />
      <ReportDogStack.Screen name="Miss" component={Miss} />
      <ReportDogStack.Screen name="MissPost" component={MissPost} />
      <ReportDogStack.Screen name="Found" component={Found} />
      <ReportDogStack.Screen
        name="FoundCameraGuide"
        component={FoundCameraGuide}
      />
      <ReportDogStack.Screen
        name="FoundDogNoseCamera"
        component={FoundDogNoseCamera}
      />
      <ReportDogStack.Screen name="FoundPost" component={FoundPost} />
      <ReportDogStack.Screen
        name="FoundResultFail"
        component={FoundResultFail}
      />
      <ReportDogStack.Screen
        name="FoundResultSuccess"
        component={FoundResultSuccess}
      />
      <AddDogStack.Screen name="HomeMain" component={Home} />
      <ReportDogStack.Screen name="Notification" component={Notification} />
    </ReportDogStack.Navigator>
  );
};

const HealthStack = () => {
  return (
    <HealthDogStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colorType.white},
      }}>
      <HealthDogStack.Screen name="HealthMain" component={Health} />
      <HealthDogStack.Screen name="Notification" component={Notification} />
    </HealthDogStack.Navigator>
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
      routeName === 'DogNoseCamera' ||
      routeName === 'DogProfileResult' ||
      routeName === 'ProfileInfo' ||
      routeName === 'MissPost' ||
      routeName === 'FoundPost' ||
      routeName === 'FoundCameraGuide' ||
      routeName === 'FoundDogNoseCamera' ||
      routeName === 'FoundResultFail' ||
      routeName === 'FoundResultSuccess' ||
      routeName === 'Notification'
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
        component={HealthStack}
        options={{
          title: '건강 일지',
          tabBarIcon: HealthTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MissFound"
        component={MissFoundStack}
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
