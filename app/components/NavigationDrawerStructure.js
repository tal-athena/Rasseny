
import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet, ImageBackground} from 'react-native';

import FastImage from 'react-native-fast-image';

Dimensions = require('Dimensions');
const windowWidth = Dimensions.get('window').width;

import {setSide} from '../actions';
import {connect} from "react-redux";



const logo = require('../assets/logo4.png');
export class NavigationDrawerStructure extends React.Component {
  //Structure for the navigation Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    
    this.props.setSide({
      isVisible: true,
    })
    this.props.navigationProps.openDrawer();
  };
  render() {
    return (      
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
        <View style = {{flex:1}}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FastImage
              source={require('../assets/menu.png')}
              style={{ width: 40, height: 40, marginLeft: 5 }}
            />
          </TouchableOpacity>          
          </View>
          <View style={styles.logoContainer}>
            <ImageBackground source={logo} imageStyle = {{resizeMode:'center'}} style={styles.logo} />
          </View>
        </View>  
    );
  }

};

const mapDispatchToProps = dispatch => {

  return {
      setSide : side => { dispatch(setSide(side)) },      
  }

}

const mapStateToProps = state => {
  return { 
    side: state.side,    
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerStructure)


const styles = StyleSheet.create({
  logo : {    
    width: windowWidth - 80,
    height: 50,
  },
  logoContainer: {
    flex: 1,       
  },
});
