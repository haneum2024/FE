import 'react-native-reanimated'
import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  detectObjects,
  FrameProcessorConfig,
} from 'vision-camera-realtime-object-detection';
const frameProcessorConfig: FrameProcessorConfig = {
  modelFile: '/model/yolov5su_saved_model/yolov5su_float32.tflite',
  scoreThreshold: 0.5,
};

interface Props { }

const CamTrack = (props: Props) => {
  const devices = useCameraDevices();
  const device = useMemo(() => findBestDevice(devices), [devices]);

  const findBestDevice = (devices: CameraDevice[]) => {
    if (devices.length > 0) {
      return devices[0];
    }
    return null;
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedObjects = detectObjects(frame, frameProcessorConfig);
    console.log(detectedObjects);
  }, []);

  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <Camera
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default CamTrack;
