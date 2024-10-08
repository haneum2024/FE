import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import color from '../../styles/color';
import {Button} from 'react-native-paper';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type FoundNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'FoundCameraGuide'
>;

const FoundDogNoseCamera = () => {
  const navigation = useNavigation<FoundNavigationProp>();

  const moveToSuccessPage = () => {
    navigation.navigate('FoundResultSuccess');
  };

  const moveToFailPage = () => {
    navigation.navigate('FoundResultFail');
  };

  return (
    <View style={styles.container}>
      <Button onPress={moveToSuccessPage}>성공</Button>
      <Button onPress={moveToFailPage}>실패</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.gray[50],
    gap: 20,
  },
  preview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoundDogNoseCamera;
