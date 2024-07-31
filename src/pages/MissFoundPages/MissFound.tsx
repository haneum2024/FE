import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Header from '../../components/Header';
import BornIcon from '../../components/Icons/BornIcon';
import ProfileIcon from '../../components/Icons/ProfileIcon';
import Found from './Found';
import Miss from './Miss';
import type {MissFoundPageNavigation} from '../../../types/navigation';
import colorType from '../../styles/color';

const TopTab = createMaterialTopTabNavigator<MissFoundPageNavigation>();

const ProfileTabBarIcon = ({color}: {color: string}) => (
  <ProfileIcon width={25} height={25} fill={color} />
);

const LogoTabBarIcon = ({color}: {color: string}) => (
  <BornIcon width={25} height={25} fill={color} />
);

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
        component={Found}
        options={{
          tabBarIcon: ProfileTabBarIcon,
          tabBarLabel: '주인을 찾아요',
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
        }}
      />
      <TopTab.Screen
        name="Miss"
        component={Miss}
        options={{
          tabBarIcon: LogoTabBarIcon,
          tabBarLabel: '반려견을 찾아요',
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
        }}
      />
    </TopTab.Navigator>
  );
};

function MissFound() {
  return (
    <ScrollView style={styles.missFoundContainer}>
      <Header />
      <MissFoundTab />
    </ScrollView>
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
  missFoundContainer: {},
});

export default MissFound;
