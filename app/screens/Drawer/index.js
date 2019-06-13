import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Icon } from 'native-base';
import FastImage from 'react-native-fast-image';

import GLOBAL from './global';

export default class Drawer extends Component {

  constructor() {
    super();
    this.state = {
      button1Clicked: false,
      button2Clicked: false,
      button3Clicked: false,
      button4Clicked: false,
      button5Clicked: false,
      button6Clicked: false,
      button7Clicked: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <FastImage
            source={require('../../assets/logo.png')}
            style={styles.drawerPicture}
          />
          <Text style={styles.drawerTitle}>starterApp Title</Text>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button1Clicked: true})}
          onPressOut={() => this.setState({button1Clicked: false})}
        >
          <View style={this.state.button1Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='settings' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button2Clicked: true})}
          onPressOut={() => this.setState({button2Clicked: false})}
        >
          <View style={this.state.button2Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='people' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Friends</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.divider}/>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button3Clicked: true})}
          onPressOut={() => this.setState({button3Clicked: false})}
        >
          <View style={this.state.button3Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='help-buoy' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Support</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button4Clicked: true})}
          onPressOut={() => this.setState({button4Clicked: false})}
        >
          <View style={this.state.button4Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='paper' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Licences</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button5Clicked: true})}
          onPressOut={() => this.setState({button5Clicked: false})}
        >
          <View style={this.state.button5Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='paper' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Site notice</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button6Clicked: true})}
          onPressOut={() => this.setState({button6Clicked: false})}
        >
          <View style={this.state.button6Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='paper' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Business terms</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.divider}/>

        <TouchableWithoutFeedback
          onPressIn={() => this.setState({button7Clicked: true})}
          onPressOut={() => this.setState({button7Clicked: false})}
        >
          <View style={this.state.button7Clicked ? {backgroundColor: GLOBAL.COLOR.GRAY_3} : null}>
            <View style={styles.buttonRow} >
              <View style={styles.buttonIcon}>
                <Icon name='log-out' style={{color: GLOBAL.COLOR.GRAY_5, fontSize: 34}}/>
              </View>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL.COLOR.GRAY_2,
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    height: 80,
    backgroundColor: GLOBAL.COLOR.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  drawerPicture: {
    height: 70,
    width: 70,  
  },
  drawerTitle: {
    marginLeft: 20,
    fontSize: 18,
    color: '#FFF'
  },
  divider: {
    height:1,
    backgroundColor: GLOBAL.COLOR.GRAY_5
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginLeft: 15
  },
  buttonIcon: {
    width: 40
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 16,
  }
});
