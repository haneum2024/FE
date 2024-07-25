export type AuthPageNavigation = {
  Login: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
  TermsOfUse: undefined;
};

export interface ProfileInfoType {
  dogName: string;
  dogBreed: string;
  dogGender: string;
  isNeutered: boolean;
  dogBirth: string;
  dogIntroduction: string;
  dogImage: string;
}

export interface CameraGuideType extends ProfileInfoType {
  name: string;
  introduction: string;
  profileImage: string;
}

export interface DogNoseCameraType extends CameraGuideType {
  // 사진 5장에 대한 타입 추가
}

export type AddDogPageNavigation = {
  HomeMain: undefined;
  DogInfo: undefined;
  ProfileInfo: ProfileInfoType;
  CameraGuide: CameraGuideType;
  DogNoseCamera: DogNoseCameraType;
  DogProfileResult: undefined;
};
