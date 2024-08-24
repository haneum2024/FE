import React, { useState, useRef, useEffect } from 'react';
import { Button, Dimensions, Image, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import WebSocket from 'react-native-websocket';
import color from '../../styles/color';
import { AddDogPageNavigation } from '../../../types/navigation';
import { Text, TextInput } from 'react-native-paper';

interface DogNoseCameraType {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogNoseCamera'>;
  route: RouteProp<AddDogPageNavigation, 'DogNoseCamera'>;
}

const ObjectTracker = () => {
  const [hasPermission,] = useState<any | null>('garanted');
  const [label, setLabel] = useState('');
  const [processedImage, setProcessedImage] = useState<any | null>(null);
  const cameraRef = useRef<any | null>(null);
  const wsRef = useRef<any | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://your-server-ip:8000/ws');
    wsRef.current.onmessage = (event: any) => {
      setProcessedImage(event.data);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const captureAndSendFrame = async () => {
    if (cameraRef.current && wsRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      wsRef.current.send(`data:image/jpeg;base64,${photo.base64}`);
    }
  };

  const setTrackingLabel = async () => {
    try {
      await fetch('http://your-server-ip:8000/input_label', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label }),
      });
    } catch (error) {
      console.error('Error setting label:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(captureAndSendFrame, 1000); // Send frame every second
    return () => clearInterval(intervalId);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera style={{ flex: 1 }} ref={cameraRef} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
        }}>
        <TextInput
          placeholder="Enter label to track"
          value={label}
          onChangeText={setLabel}
          style={{ backgroundColor: 'white', padding: 10, marginBottom: 10 }}
        />
        <Button title="Set Tracking Label" onPress={setTrackingLabel} />
      </View>
      {processedImage && (
        <Image
          source={{ uri: processedImage }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ObjectTracker;
