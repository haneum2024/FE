import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Button} from 'react-native-paper';

import CustomText from '../../components/CustomText';
import type {AddDogPageNavigation} from '../../../types/navigation';

interface DogNoseCameraType {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogNoseCamera'>;
  route: RouteProp<AddDogPageNavigation, 'DogNoseCamera'>;
}

const DogNoseCamera = ({navigation, route}: DogNoseCameraType) => {
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
    address,
    profileImage,
  } = route.params;

  return (
    <View style={styles.cameraContainer}>
      <Text>Dog Name: {dogName}</Text>
      <Text>Dog Breed: {dogBreed}</Text>
      <Text>Dog Gender: {dogGender}</Text>
      <Text>Dog dogBirth: {dogBirth}</Text>
      <Text>Is Neutered: {isNeutered ? 'Yes' : 'No'}</Text>
      <Text>Dog Introduction: {dogIntroduction}</Text>
      <Text>Dog Image: {dogImage}</Text>
      <Text>name: {name}</Text>
      <Text>introduction: {introduction}</Text>
      <Text>address: {address}</Text>
      <Text>profileImage: {profileImage}</Text>
      <Button
        onPress={() => {
          navigation.navigate('DogProfileResult', {
            dogName,
            dogBreed,
            dogGender,
            isNeutered,
            dogBirth,
            dogIntroduction,
            dogImage,
            name,
            introduction,
            address,
            profileImage,
          });
        }}>
        <CustomText>Next</CustomText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    padding: 20,
  },
});

export default DogNoseCamera;
