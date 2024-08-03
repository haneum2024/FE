import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {decodeJpeg} from '@tensorflow/tfjs-react-native';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

import CustomText from '../../components/CustomText';
import type {AddDogPageNavigation} from '../../../types/navigation';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import '@tensorflow/tfjs-react-native';
import {useTensorflowModel} from 'react-native-fast-tflite';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-core';

interface DogNoseCameraType {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogNoseCamera'>;
  route: RouteProp<AddDogPageNavigation, 'DogNoseCamera'>;
}

const TensorCamera = cameraWithTensors(RNCamera);

const DogNoseCamera = ({navigation, route}: DogNoseCameraType) => {
  const tfModel = useTensorflowModel(
    require('../../assets/yolov5su_saved_model/yolov5su_float32.tflite'),
  );
  const [photos, setPhotos] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<any>(null);
  const cameraRef = useRef<any | null>(null);
  const [currentState, setCurrentState] = useState('');

  const runInference = async (input: any) => {
    if (tfModel.state !== 'loaded' || tf.model === undefined) {
      setCurrentState('Model is not loaded');
      return null;
    }

    console.log('input');
    const output = tfModel.model.runSync([input]);
    console.log('output');
    setCurrentState('Inference done');
    setPredictions(output);
  };

  // const handleCameraStream = async (images: any) => {
  //   setCurrentState('Camera is ready');

  //   const loop = async () => {
  //     const nextImageTensor = images.next().value;
  //     if (nextImageTensor) {
  //       setCurrentState('Running inference');
  //       await runInference(nextImageTensor);
  //       tf.dispose([nextImageTensor]);
  //     }
  //     requestAnimationFrame(loop);
  //   };
  //   loop();
  // };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 1, base64: true, pauseAfterCapture: false};
      const data = await cameraRef.current.takePictureAsync(options);
      // setPhotos(prevPhotos => [...prevPhotos, data.uri]);
      // console.log('사진 촬영', data);
      // return imageFileToTensor(data.uri);
      return base64ToArrayBuffer(data.base64);
    }
  };

  async function imageFileToTensor(fileUri: string) {
    const response = await fetch(fileUri);
    console.log(1);
    const imageDataArrayBuffer = await response.arrayBuffer();
    console.log(2);
    console.log(imageDataArrayBuffer);
    const imageData = new Uint8Array(imageDataArrayBuffer);
    console.log(3);
    const imgTensor = decodeJpeg(imageData);
    console.log(4);
    const uint32arr = new Uint32Array(imgTensor.dataSync());
    console.log(5);
    return uint32arr;

    // const tensor = tf.browser
    //   .fromPixels(imageData)
    //   .resizeBilinear(inputSize)
    //   .expandDims(0)
    //   .toFloat()
    //   .div(tf.scalar(224.0));

    // return tensor;
  }

  async function base64ToArrayBuffer(base64: string) {
    // const tensor = convert(base64);
    // try {
    // const b = atob(base64);
    // const buf = new ArrayBuffer(b.length);
    // const byteNumbers = new Uint8Array(buf);
    // for (let i = 0; i < b.length; i++) {
    //   byteNumbers[i] = b.charCodeAt(i);
    // }
    // console.log('byteNumbers', byteNumbers);
    // let tensor = tf.tensor(byteNumbers, [1, b.length]);
    // const typedArray = Object.getPrototypeOf(Uint8Array);
    // console.log('byteNumbers', byteNumbers instanceof typedArray);
    // console.log('byteNumbers', byteNumbers.slice(0, 10));
    // console.log('length', byteNumbers.length);
    // const tensor = tf.tensor([byteNumbers]);
    // console.log('tensor', tensor);
    // return tensor;
    // } catch (e) {
    //   console.log(e);
    // }
    // return null;
  }

  const loopTracking = async (images, updatePreview, gl) => {
    const loop = async () => {
      // const img: any = await takePicture();
      const nextImageTensor = images.next().value;
      // if (img) {
      setCurrentState('Running inference');
      await runInference(nextImageTensor);
      tf.dispose([nextImageTensor]);
      // } else {
      //   console.log('no image');
      // }
      // handleCameraStream(img);
      updatePreview();
      gl.endFrameEXP();
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
      {/* <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onCameraReady={() => {
          if (cameraRef.current) {
            // const images = cameraRef.current.getPreviewData();
            loopTracking();
          }
        }}
      /> */}
      <TensorCamera
        cameraTextureHeight={224}
        cameraTextureWidth={224}
        // Standard Camera props
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        // Tensor related props
        resizeHeight={224}
        resizeWidth={224}
        resizeDepth={1}
        useCustomShadersToResize={false}
        onReady={loopTracking}
        autorender={false}
      />
      <View style={styles.overlay}>
        <Text>{currentState}</Text>
        {predictions && <Text>{JSON.stringify(predictions)}</Text>}
        {/* <Button onPress={loopTracking}>
          <CustomText>Take Picture</CustomText>
        </Button> */}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});

export default DogNoseCamera;
