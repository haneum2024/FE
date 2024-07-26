import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import CustomText from '../components/CustomText';
import color from '../styles/color';

function Camera() {
  const [photos, setPhotos] = useState<string[]>([]);
  const cameraRef = useRef<RNCamera>(null);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const options = {quality: 1, base64: true, pauseAfterCapture: false};
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotos(prevPhotos => [...prevPhotos, data.uri]);
      console.log('사진 촬영', data.uri);
    }
  };

  useEffect(() => {
    // 테스트를 위해 오버레이 안에 특정 물체가 나타났다고 가정하고 사진을 찍기 시작합니다.
    const startTakingPhotos = () => {
      setIsTakingPhotos(true);
      let photoCount = 0;
      const interval = setInterval(async () => {
        if (photoCount < 5) {
          await takePicture();
          photoCount += 1;
          console.log('photoCount', photoCount);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };

    // 오버레이 안에 특정 물체가 나타났다고 가정하고 2초 후에 사진을 찍기 시작합니다.
    setTimeout(startTakingPhotos, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
        <View style={styles.overlay}>
          <View style={styles.circle} />
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: color.gray[50],
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
  circle: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 6,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#6fb61eb3',
  },
});

export default Camera;
