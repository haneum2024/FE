import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login';
import TermsOfUse from './src/pages/TermsOfUse';
import SignUpFirstStep from './src/pages/SignUpFirstStep';
import SignUpSecondStep from './src/pages/SignUpSecondStep';

const Stack = createStackNavigator();

function AppSignIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppSignIn;
