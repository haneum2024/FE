import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import type {AddDogPageNavigation} from '../../../types/navigation';
import {RouteProp} from '@react-navigation/native';

interface CameraGuideProps {
  navigation: StackNavigationProp<AddDogPageNavigation, 'CameraGuide'>;
  route: RouteProp<AddDogPageNavigation, 'CameraGuide'>;
}

const CameraGuide = ({navigation, route}: CameraGuideProps) => {
  const {
    dogName,
    dogBreed,
    dogGender,
    isNeutered,
    dogBirth,
    dogIntroduction,
    dogImage,
    name,
    introduction,
    profileImage,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text>Dog Name: {dogName}</Text>
      <Text>Dog Breed: {dogBreed}</Text>
      <Text>Dog Gender: {dogGender}</Text>
      <Text>Dog dogBirth: {dogBirth}</Text>
      <Text>Is Neutered: {isNeutered ? 'Yes' : 'No'}</Text>
      <Text>Dog Introduction: {dogIntroduction}</Text>
      <Text>Dog Image: {dogImage}</Text>
      <Text>name: {name}</Text>
      <Text>introduction: {introduction}</Text>
      <Text>profileImage: {profileImage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default CameraGuide;
