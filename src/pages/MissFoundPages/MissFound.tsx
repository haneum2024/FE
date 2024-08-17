import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/Header';
import BornIcon from '../../components/Icons/BornIcon';
import ProfileIcon from '../../components/Icons/ProfileIcon';

import colorType from '../../styles/color';
import Found from './Found';
import Miss from './Miss';
import FoundDetail from './FoundDetail';
import MissDetail from './MissDetail';
import type {
  FoundDogPageNavigation,
  MissDogPageNavigation,
  MissFoundPageNavigation,
} from '../../../types/navigation';

const TopTab = createMaterialTopTabNavigator<MissFoundPageNavigation>();
const FoundBoardStack = createStackNavigator<FoundDogPageNavigation>();
const MissBoardStack = createStackNavigator<MissDogPageNavigation>();

const ProfileTabBarIcon = ({color}: {color: string}) => (
  <ProfileIcon width={25} height={25} fill={color} />
);

const LogoTabBarIcon = ({color}: {color: string}) => (
  <BornIcon width={25} height={25} fill={color} />
);

const FoundStack = () => {
  return (
    <FoundBoardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <FoundBoardStack.Screen name="FoundBoard" component={Found} />
      <FoundBoardStack.Screen name="FoundDetail" component={FoundDetail} />
    </FoundBoardStack.Navigator>
  );
};

const MissStack = () => {
  return (
    <MissBoardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MissBoardStack.Screen name="MissBoard" component={Miss} />
      <MissBoardStack.Screen name="MissDetail" component={MissDetail} />
    </MissBoardStack.Navigator>
  );
};

const MissFoundTab = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: colorType.gray[800],
        tabBarActiveTintColor: colorType.blue[600],
        tabBarShowLabel: true,
        tabBarPressColor: colorType.blue[100],
        tabBarIndicatorStyle: {
          backgroundColor: colorType.blue[600],
          height: 2,
        },
        tabBarItemStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
          gap: 8,
        },
      }}>
      <TopTab.Screen
        name="Found"
        component={FoundStack}
        options={{
          tabBarIcon: ProfileTabBarIcon,
          tabBarLabel: '유기견 발견',
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
        }}
      />
      <TopTab.Screen
        name="Miss"
        component={MissStack}
        options={{
          tabBarIcon: LogoTabBarIcon,
          tabBarLabel: '반려견 실종',
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
        }}
      />
    </TopTab.Navigator>
  );
};

function MissFound() {
  return (
    <View style={styles.missFoundContainer}>
      <Header />
      <MissFoundTab />
    </View>
  );
}

const styles = StyleSheet.create({
  topTab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  missFoundContainer: {
    flex: 1,
  },
});

export default MissFound;
