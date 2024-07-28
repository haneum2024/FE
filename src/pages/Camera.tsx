import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import color from '../styles/color';

function Camera() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [fillAmount, setFillAmount] = useState(0);
  const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const options = {
        quality: 1,
        base64: true,
        pauseAfterCapture: false,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotos(prevPhotos => [...prevPhotos, data.uri]);
      console.log('사진 촬영', data.uri);

      setFillAmount(prevFill => Math.min(prevFill + 20, 100));
    }
  };

  useEffect(() => {
    // 예시: 2초마다 자동으로 사진 촬영
    const interval = setInterval(() => {
      if (photos.length < 5) {
        takePicture();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  const moveToNextPage = () => {
    console.log('사진 촬영 완료');
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
        <View style={styles.overlay}>
          <AnimatedCircularProgress
            size={Dimensions.get('window').width / 2.5}
            width={15}
            fill={fillAmount}
            duration={500}
            tintColor={color.blue[600]}
            onAnimationComplete={() => {
              if (fillAmount === 100) {
                moveToNextPage();
              }
            }}
            backgroundColor={color.white + '80'} // opacity 50%
          />
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
});

export default Camera;
