import  React from 'react';
import AppNavigator from './src/navigation/navigation';

import { View, StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';  

function App() {
  return (
    <Provider store={store} >
      <AppNavigator />
    </Provider>
  )
}

export default App;