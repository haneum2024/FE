/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
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
import GalleryIcon from '../img/GalleryIcon.svg';

const InputImage = ({
  title,
  text,
  isEssential = false,
  handleImage,
}: {
  title?: string;
  text?: string;
  isEssential?: boolean;
  handleImage: (image: string) => void;
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [image, setImage] = useState('');

  const handleSelectImage = () => {
    actionSheetRef.current?.show();
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
      }
    } catch (error) {
      console.error('Error requesting camera permission: ', error);
    }
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
          const base64Data = response.assets[0].base64 as string;
          setImage(imageUri);
          handleImage(base64Data);
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
          setImage(imageUri);
          handleImage(base64Data);
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
      <View
        style={[
          styles.essentialContainer,
          {justifyContent: title ? 'space-between' : 'flex-end'},
        ]}>
        {title && (
          <CustomText weight="600" style={styles.label}>
            {title}
          </CustomText>
        )}
        {isEssential && (
          <CustomText weight="500" style={styles.essential}>
            * 필수
          </CustomText>
        )}
      </View>
      <TouchableOpacity onPress={getImage} activeOpacity={0.8}>
        {image ? (
          <Image source={{uri: image}} style={styles.imageBox} />
        ) : (
          <View style={styles.imageBox}>
            <CameraIcon width={50} height={50} />
            <CustomText weight="600" style={styles.imageText}>
              {text ? text : '사진 업로드'}
            </CustomText>
          </View>
        )}
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheetContainer}>
        <View style={styles.selectContainer}>
          <TouchableWithoutFeedback onPress={getImageFromLibrary}>
            <View style={styles.buttonContainer}>
              <GalleryIcon width={50} height={50} />
              <CustomText weight="600" style={styles.imageText}>
                갤러리
              </CustomText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={requestCameraPermission}>
            <View style={styles.buttonContainer}>
              <CameraIcon width={50} height={50} />
              <CustomText weight="600" style={styles.imageText}>
                카메라
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
    color: color.gray[950],
  },
  essentialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  essential: {
    fontSize: 13,
    color: color.blue[400],
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
  actionSheetContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    gap: 5,
    backgroundColor: color.gray[50],
  },
});

export default InputImage;
