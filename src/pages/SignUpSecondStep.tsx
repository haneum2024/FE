import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../store/reducers/authReducer';
import {AppDispatch} from '../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {PageNavigation} from '../../types/navigation';

interface SignUpSecondStepProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpSecondStep'>;
}

const handleSignUpComplete = (dispatch: AppDispatch) => {
  // 여기서 사용자 계정을 등록하는 로직을 추가합니다.

  // 로그인 상태로 변경
  dispatch(login());
};

const SignUpSecondStep: React.FC<SignUpSecondStepProps> = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>회원가입 단계 2</Text>
      <Pressable
        style={styles.button}
        onPress={() => handleSignUpComplete(dispatch)}>
        <Text>시작하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default SignUpSecondStep;
