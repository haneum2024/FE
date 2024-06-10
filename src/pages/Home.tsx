import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

function Home() {
  const [photos, setPhotos] = useState([]);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotos([...photos, data.uri]);
      console.log('사진 촬영', photos.length + 1);
    }
  };

  const handleConfirm = () => {
    // 사진 확인 버튼을 눌렀을 때 처리할 로직을 추가하세요
    console.log('사진 전송');
  };

  return (
    <>
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
      <View style={styles.buttonWrapper}>
        <ScrollView horizontal style={styles.photoContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={{uri: photo}} style={styles.photo} />
          ))}
        </ScrollView>
        {photos.length === 5 ? (
          <Pressable style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>사진 전송</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>사진 촬영</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  preview: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2,
    backgroundColor: '#D2D2D2',
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#6fb61eb3',
  },
  photoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  photo: {
    width: 70,
    height: 70,
    marginHorizontal: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'black',
  },
});

export default Home;
