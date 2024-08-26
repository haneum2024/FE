import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
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
  ReportDogPageNavigation,
} from '../../../types/navigation';
import {PaperProvider} from 'react-native-paper';

const TopTab = createMaterialTopTabNavigator<MissFoundPageNavigation>();
const FoundBoardStack = createStackNavigator<FoundDogPageNavigation>();
const MissBoardStack = createStackNavigator<MissDogPageNavigation>();

const ProfileTabBarIcon = ({color}: {color: string}) => (
  <ProfileIcon width={25} height={25} fill={color} />
);

const LogoTabBarIcon = ({color}: {color: string}) => (
  <BornIcon width={25} height={25} fill={color} />
);

const FoundStack = () => (
  <FoundBoardStack.Navigator screenOptions={{headerShown: false}}>
    <FoundBoardStack.Screen name="FoundBoard" component={Found} />
    <FoundBoardStack.Screen name="FoundDetail" component={FoundDetail} />
  </FoundBoardStack.Navigator>
);

const MissStack = () => (
  <MissBoardStack.Navigator screenOptions={{headerShown: false}}>
    <MissBoardStack.Screen name="MissBoard" component={Miss} />
    <MissBoardStack.Screen name="MissDetail" component={MissDetail} />
  </MissBoardStack.Navigator>
);

const MissFoundTab = ({routeName}: {routeName: 'Miss' | 'Found'}) => (
  <TopTab.Navigator
    initialRouteName={routeName}
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
        tabBarLabel: '유실견 발견',
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

type MissFoundNavigation = StackNavigationProp<
  ReportDogPageNavigation,
  'Notification'
>;

function MissFound({
  route,
}: {
  route?: RouteProp<ReportDogPageNavigation, 'MissFoundMain'>;
}) {
  const navigation = useNavigation<MissFoundNavigation>();
  const routeName = route?.params?.routeName;

  return (
    <PaperProvider>
      <View style={styles.missFoundContainer}>
        <Header navigation={navigation} />
        <MissFoundTab routeName={routeName || 'Found'} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  missFoundContainer: {
    flex: 1,
  },
});

export default MissFound;
