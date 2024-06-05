import React, {useEffect} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function Login() {

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => onGoogleButtonPress()}>
        <Text>구글로그인</Text>
      </Pressable>
    </View>
  );
}



export default Login;
