import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login';
import SignUpFirstStep from './src/pages/SignUpFirstStep';
import SignUpSecondStep from './src/pages/SignUpSecondStep';

const Stack = createStackNavigator();

function AppSignIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
    </Stack.Navigator>
  );
}

export default AppSignIn;
