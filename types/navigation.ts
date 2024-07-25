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

export type AddDogPageNavigation = {
  HomeMain: undefined;
  CameraGuide: CameraGuideType;
  DogInfo: undefined;
  ProfileInfo: ProfileInfoType;
  DogProfileResult: undefined;
};
