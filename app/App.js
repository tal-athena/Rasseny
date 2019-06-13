import React from 'react';
import AppContainer from './AppContainer';
import { connect , Provider } from 'react-redux';
import store from "./store/configureStore";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );    
  }
}