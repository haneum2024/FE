import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Button,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import color from '../styles/color';
import CustomText from './CustomText';

import CameraIcon from '../img/CameraIcon.svg';

const InputImage = ({
  title,
  handleImage,
}: {
  title: string;
  handleImage: (image: string) => void;
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [image, setImage] = useState('');

  const handleSelectImage = () => {
    actionSheetRef.current?.show();
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const requestCameraPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        // 권한이 허용됨
        getImageFromCamera();
      } else if (result === RESULTS.DENIED) {
        // 권한이 거부됨
        console.log('Camera permission denied');
      } else if (result === RESULTS.BLOCKED) {
        // 권한이 차단됨
        Alert.alert(
          'Permission Required',
          'Camera access is required to take a photo. Please enable it in the app settings.',
          [
            {text: 'Open Settings', onPress: openSettings},
            {text: 'Cancel', style: 'cancel'},
          ],
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission: ', error);
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: mimeType});
  };

  const getImageFromLibrary = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1 as PhotoQuality,
      includeBase64: true,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode || response.errorMessage) {
        console.log(
          'ImagePicker Error: ',
          response.errorCode || response.errorMessage,
        );
      } else {
        if (response.assets) {
          const imageUri = response.assets[0].uri as string;
          setImage(imageUri);
          handleImage(imageUri);

          //   const imageFile = await fetch(response.assets[0].base64 as string);
          //   const imageBlob = await imageFile.blob();
          //   console.log('imageBlob', imageBlob);
        }
      }
    });
    actionSheetRef.current?.hide();
  };

  const getImageFromCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1 as PhotoQuality,
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode || response.errorMessage) {
        console.log(
          'Camera Error: ',
          response.errorCode || response.errorMessage,
        );
      } else {
        if (response.assets) {
          const imageUri = response.assets[0].uri as string;
          const base64Data = response.assets[0].base64 as string;
          const mimeType = response.assets[0].type as string;
          setImage(imageUri);
          handleImage(imageUri);

          console.log('response', response);
          //   const imageBlob = base64ToBlob(base64Data, mimeType);
          //   console.log('imageBlob', imageBlob);
        }
      }
    });
    actionSheetRef.current?.hide();
  };

  const getImage = () => {
    handleSelectImage();
  };

  return (
    <View style={styles.imageContainer}>
      <CustomText weight="600" style={styles.label}>
        {title}
      </CustomText>
      <TouchableOpacity onPress={getImage}>
        {image ? (
          <Image source={{uri: image}} style={styles.imageBox} />
        ) : (
          <View style={styles.imageBox}>
            <CameraIcon width={50} height={50} />
            <CustomText weight="600" style={styles.imageText}>
              사진 업로드
            </CustomText>
          </View>
        )}
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <Button title="Choose from Gallery" onPress={getImageFromLibrary} />
        <Button title="Take a Photo" onPress={requestCameraPermission} />
        <Button title="Cancel" onPress={() => actionSheetRef.current?.hide()} />
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: color.gray[950],
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    backgroundColor: color.gray[100],
    borderRadius: 10,
  },
  imageText: {
    fontSize: 13,
    color: color.gray[500],
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: color.white,
  },
});

export default InputImage;
