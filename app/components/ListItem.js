

import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
Dimensions = require('Dimensions');

const deviceWidth = Dimensions.get('window').width;

import {SURVEY_IMAGE_URL} from '../config'
import FastImage from 'react-native-fast-image';

export default class ListItem extends React.Component {
  //Structure for the navigation Drawer
  render() {

    return (
        <TouchableOpacity style = {this.props.style} onPress = {this.props.onPress}>           
          <View style = {{flex: 1, flexDirection: 'column', alignItems: 'center'}}>          
            <FastImage 
              source = {{ uri:  SURVEY_IMAGE_URL + this.props.imageDat}} 
              style = {{width: '100%', height: 150  }}
            />
            <View style = {{flexDirection: 'row', alignItems: 'center', position:'absolute', top:10, right:10, opacity:0.6}}>
                <FastImage source = {require('../assets/star.png')} style = {{width: 30, height: 30}} ></FastImage>
                <Text style = {{color: '#ff0', fontSize: 22}}>{this.props.frequency}</Text>
            </View>            
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', width: '100%', height:50, alignItems:'center', flexWarp: 'warp'}}>              
              <Text style = {{fontSize: 16, color: '#fff', marginLeft:5, width: '70%'}}>{this.props.title}</Text>                            
              <Text style = {{fontSize: 12, color: '#eee', width: '25%'}}>{this.props.userName}</Text>                            
            </View>          
          </View>
        </TouchableOpacity>
    );
  }
};
