import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login';
import TermsOfUse from './src/pages/TermsOfUse';

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
    </Stack.Navigator>
  );
}

export default AppSignIn;
