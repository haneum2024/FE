export type AuthPageNavigation = {
  Login: undefined;
  TermsOfUse: undefined;
};

export type MainPageNavigation = {
  Home: undefined;
  Health: undefined;
  MissFound: undefined;
  MyInfo: undefined;
};

export type MissFoundPageNavigation = {
  Found: undefined;
  Miss: undefined;
};

export interface ProfileInfoType {
  dogName: string;
  dogBreed: string;
  dogGender: 'MALE' | 'FEMALE';
  isNeutered: boolean;
  dogBirth: string;
  dogIntroduction: string;
  base64Image: string;
}

export interface CameraGuideType extends ProfileInfoType {
  name: string;
  introduction: string;
  address: string;
  base64ProfileImage: string;
}

export interface DogNoseCameraType extends CameraGuideType {}

export interface DogProfileResultType extends DogNoseCameraType {
  // 사진 5장에 대한 타입 추가
}

export type AddDogPageNavigation = {
  HomeMain: undefined;
  DogInfo: undefined;
  ProfileInfo: ProfileInfoType;
  CameraGuide: CameraGuideType;
  DogNoseCamera: DogNoseCameraType;
  DogProfileResult: DogProfileResultType;
  Notification: undefined;
};

export type HealthPageNavigation = {
  HealthMain: undefined;
  Notification: undefined;
};

export type ReportDogPageNavigation = {
  MissFoundMain: {routeName: 'Miss' | 'Found'};
  Miss: undefined;
  MissPost: undefined;
  MissDetail: {id: string};
  Found: undefined;
  FoundCameraGuide: undefined;
  FoundDogNoseCamera: undefined;
  FoundDetail: {id: string};
  FoundPost: undefined;
  FoundResult: undefined;
  FoundResultFail: undefined;
  FoundResultSuccess: undefined;
  Notification: undefined;
};

export type FoundDogPageNavigation = {
  FoundBoard: undefined;
  FoundDetail: {id: string};
};

export type MissDogPageNavigation = {
  MissBoard: undefined;
  MissDetail: {id: string};
};
