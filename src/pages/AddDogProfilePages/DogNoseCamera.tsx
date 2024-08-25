import React, { useState, useRef, useEffect } from 'react';
import { Button, Dimensions, Image, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import WebSocket from 'react-native-websocket';
import useWebSocket from 'react-native-use-websocket';
import color from '../../styles/color';
import { AddDogPageNavigation } from '../../../types/navigation';
import { Text, TextInput } from 'react-native-paper';
import * as timers from "node:timers";

const socketUrl = 'wsip';


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

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    shouldReconnect: (closeEvent) => true,
  });

  const captureAndSendFrame = async () => {
    if (cameraRef.current) { 
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      setTimeout(() => {
        sendMessage(`data:image/jpeg;base64,${photo.base64}`)
      }, 500)
      console.log(lastMessage)
    }
  };

  const setTrackingLabel = async () => {
    try {
      await fetch('ip', {
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
    const intervalId = setInterval(captureAndSendFrame, 1500); 
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
        <RNCamera captureAudio={false} style={{ flex: 1 }} ref={cameraRef} />
        {lastMessage && (
            <Image
                source={{ uri: lastMessage.data }}

                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                resizeMode="contain"
            />
        )}
      </View>
  );
};

export default ObjectTracker;