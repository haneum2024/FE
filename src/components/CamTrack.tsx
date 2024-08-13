import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { DetectedObject, detectObjects, FrameProcessorConfig } from 'vision-camera-realtime-object-detection';

interface Props { }

const CamTrack = () => {
  const devices = useCameraDevices();
  const [data, setData] = useState<any | null>(null);
  // const device = useMemo(() => findBestDevice(devices), [devices]);

  // const findBestDevice = (devices: CameraDevice[]) => {
  //   if (devices.length > 0) {
  //     return devices[0];
  //   }
  //   return null;
  // };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedObjects: DetectedObject[] = detectObjects(frame, {
      modelFile: './yolov5su_float32.tflite',
      scoreThreshold: 0.5,
    });
    setData(detectedObjects);
  }, []);

  // if (device == null) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View>
      <Camera
        device={devices[0]}
        isActive={true}
        frameProcessor={frameProcessor}
        style={StyleSheet.absoluteFill}
      />
      {data && JSON.stringify(data)}
    </View>
  );
};

export default CamTrack;
