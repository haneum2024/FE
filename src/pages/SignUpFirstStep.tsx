import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {PageNavigation} from '../../types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

interface SignUpFirstStepProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpFirstStep'>;
}

const SignUpFirstStep: React.FC<SignUpFirstStepProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>회원가입 단계 1</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('SignUpSecondStep')}>
        <Text>다음으로</Text>
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

export default SignUpFirstStep;
