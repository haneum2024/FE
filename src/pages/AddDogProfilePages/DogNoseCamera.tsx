import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import CustomText from '../../components/CustomText';
import type {AddDogPageNavigation} from '../../../types/navigation';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import '@tensorflow/tfjs-react-native';
import {useTensorflowModel} from 'react-native-fast-tflite';
import * as tf from '@tensorflow/tfjs';

interface DogNoseCameraType {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogNoseCamera'>;
  route: RouteProp<AddDogPageNavigation, 'DogNoseCamera'>;
}

const DogNoseCamera = ({navigation, route}: DogNoseCameraType) => {
  const tfModel = useTensorflowModel(
    require('../../assets/yolov5su_saved_model/yolov5su_float32.tflite'),
  );
  const [predictions, setPredictions] = useState<any>(null);
  const cameraRef = useRef<any | null>(null);

  const runInference = async (input: any) => {
    if (tfModel.state !== 'loaded' || tf.model === undefined) {
      return null;
    }
    const output = tfModel.model.runSync([input]);
    setPredictions(output);
  };

  const handleCameraStream = async (images: any) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (nextImageTensor) {
        await runInference(nextImageTensor);
        tf.dispose([nextImageTensor]);
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  useEffect(() => {
    (async () => {
      await tf.ready();
    })();
  }, []);

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
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onCameraReady={() => {
            if (cameraRef.current) {
              const images = cameraRef.current.getPreviewData();
              handleCameraStream(images);
            }
          }}
        />
        {predictions && <Text>{JSON.stringify(predictions)}</Text>}
      </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default DogNoseCamera;
