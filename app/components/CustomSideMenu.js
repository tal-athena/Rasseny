import React from 'react';
import {Text, StyleSheet, Image, AsyncStorage, Alert} from 'react-native';
import { View } from 'native-base';

import {BASE_URL} from '../config';
import {setSide} from '../actions';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image';

class CustomSideMenu extends React.Component {
    constructor(props) {
        super(props);      
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.forceUpdate();
        }
    }
    render() {
      return (
        <View >
            <View style = {{flexDirection: 'row', alignItems: 'center', height:110, flexWarp: 'warp',  width: '100%', backgroundColor: 'rgb(48, 64, 89)'}}>
                <FastImage source={{ uri: this.props.user.photo }}
                        style={styles.sideMenuProfileIcon} />
                <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                <Text style = {{fontSize: 16, flexWrap: 'wrap', color: '#fff'}}>{this.props.user.userName}</Text>
                <Text style = {{fontSize: 14, flexWrap: 'wrap', color: '#fff'}}>{this.props.user.email}</Text>
                </View>
                
            </View>
            {/* <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15}} /> */}

            <View style={{width: '100%', height: '100%'}}>

                {/*
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 14}}>

                <FastImage source={require('../assets/main.png')}
                style={styles.sideMenuIcon} />
                
                <Text style={styles.menuText} onPress={() => { this.props.setSide({isVisible: false}); this.props.navigation.navigate('Main') }} > Main </Text>

                </View>
                */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>

                <FastImage source={require('../assets/admin.png')}
                style={styles.sideMenuIcon} />
                
                <Text style={styles.menuText} onPress={() => { this.props.setSide({isVisible: false}); this.props.navigation.closeDrawer(); this.props.navigation.navigate('Admin') }} > Admin </Text>

                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>

                <FastImage source={require('../assets/profile.png')}
                style={styles.sideMenuIcon} />

                <Text style={styles.menuText} onPress={() => { this.props.setSide({isVisible: false}); this.props.navigation.closeDrawer(); this.props.navigation.navigate('Profile') }} > Profile </Text>

                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>

                <FastImage source={require('../assets/logout.png')}
                style={styles.sideMenuIcon} />

                <Text style={styles.menuText} onPress={() => { this.props.setSide({isVisible: false}); this.props.navigation.closeDrawer(); this.onLogout() }} > Logout </Text>

                </View>
            </View>

            {/* <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15}} /> */}
        </View>
      );
    }
    onLogout() {

        Alert.alert("Confirm", "Do you want logout", [
            {
                text: "OK",
                onPress: () => {
                    var API_URL = BASE_URL + "/api/logout"; 
                    fetch(
                        API_URL,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },                
                        }
                    )    
                    .catch( error => {
                        alert("Network error...");         
                    })
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                    this.props.navigation.navigate('Home');
                }
            },
            {
                text: "Cancel",
                onPress: () => {                    
                    return;
                }
            }
        ])

        
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setSide : side => { dispatch(setSide(side)) },      
    }
  
  }

const mapStateToProps = state => {
    return { 
        user: state.user,        
     };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CustomSideMenu);

styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',        
        alignItems: 'center',
        paddingTop: 20
    },

    sideMenuProfileIcon: {
        margin: 10,         
        width: 90, 
        height: 90, 
        borderRadius: 45,
        backgroundColor: '#aa0'
    },

    sideMenuIcon: {        
        width: 36, 
        height: 36, 
        marginRight: 10,
        marginLeft: 40        
    },

    menuText:{
        fontSize: 27,
        //color: '#fff',        
    }
})