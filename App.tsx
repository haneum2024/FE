import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import AppSignIn from './AppSignIn';

function MainApp() {
  const isLogin = useSelector(state => state.auth.isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <AppInner /> : <AppSignIn />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
