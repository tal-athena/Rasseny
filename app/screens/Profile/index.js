import React, { Component } from 'react';
import { Image, Text ,TextInput,View} from 'react-native';

import styles from './styles';
import store from '../../store/configureStore';
var ImagePicker = require('react-native-image-picker');

import RNProgressHud from "react-native-progress-display";
import RNFetchBlob from 'react-native-fetch-blob'

import {
    Container,
    Content,
    Button,
  } from "native-base";
import { BASE_URL } from '../../config';

import {setUser} from "../../actions";
import {connect} from "react-redux";

const createFormData = (photo, body) => {

    const data = new FormData();
  
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            photo: store.getState().user.photo,
            userName: store.getState().user.userName,
            userId: store.getState().user.userId,
            email: store.getState().user.email,
            password1: null,
            password2: null,  
            imageFile: null,
            photo_changed: false,          
        }
    }
    render() {
        return (
            <Container style = {styles.container} >
                <Content>
                    <View style={styles.logoContainer}>
                        <Image 
                            source = {{ uri: this.state.photo }}
                            style={styles.logo} />                        
                    </View>
                    <Button 
                        style = { styles.registerButtion }
                        onPress = {() => this.onLoadImage()}
                    >
                        <Text style = {styles.buttonTxt}>
                        Update Image
                        </Text>
                    </Button>
                
                    <View style = {{alignItems: 'center', justifyContent: 'center', marginTop:30}}>
                        <TextInput placeholder = "User Name"
                            placeholderTextColor = "#aaa"
                            style = {styles.inputBox}
                            onChangeText = {(txt) => this.setState({userName:txt})}
                            value = {this.state.userName}
                        />
                        <TextInput placeholder = "Password"
                            placeholderTextColor = "#aaa"
                            secureTextEntry = {true}
                            style = {styles.inputBox}                        
                            onChangeText = {text => {this.setState({password1:text})}}
                        />
                        <TextInput placeholder = "Confirm Password" 
                            placeholderTextColor = "#aaa"
                            secureTextEntry = {true}
                            style = {styles.inputBox}
                            onChangeText = {text => {this.setState({password2:text})}}
                        />
                        <Button onPress = { () => this.updateProfile() } style= {styles.registerButtion}>
                            <Text style = {styles.buttonTxt}>Update Profile</Text>
                        </Button>
                    </View>
                </Content>
            </Container>            
        );
    }
    onLoadImage() {
        var options = {
          title: 'Select Image',
          /*
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ], */
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
                photo_changed: true,
                photo: response.uri,
                imageFile: response,
            });
          }
        });
    }


    updateProfile() {
        
        if (this.state.password1 != this.state.password2)  {
            alert("Please confirm password");
            return;
        }
        
        RNProgressHud.showWithStatus("Please wait a moment");
        

        if (this.state.photo_changed) {
            RNFetchBlob.fetch('POST', BASE_URL + "/api/updateuserphoto", {
                //Authorization: "Bearer access-token",
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
            }, [
                    // element with property `filename` will be transformed into `file` in form data
                    { name: 'photo', filename: this.state.imageFile.fileName, data: this.state.imageFile.data },                                        
                    {
                        name: 'info', data: JSON.stringify({
                            userId: this.state.userId,
                            email: this.state.email                            
                        })
                    },
                ]).then(response => response.json())
                .then((resp) => {
                    if (resp.success == "success") {
                        /*
                        this.props.setUserPhoto({
                            photo: resp.filename
                        }); */
                    } else {
                        RNProgressHud.dismiss();
                        alert("Upload photo failed");
                        return;
                    }
                    // ...
                }).catch((err) => {
                    // ...
                    RNProgressHud.dismiss();
                    alert("Network error");
                    return;
                })            
        }
        var API_URL = BASE_URL + "/api/updateuser";
        fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.userId,
                    email:this.state.email,
                    password:this.state.password,
                    userName: this.state.userName,
                })
            }
        )
        .then(response => response.json())
        .then(responseJson => {

            RNProgressHud.dismiss();

            if (responseJson.success == "success") {
                
                this.props.setUser({
                    userId: responseJson.user.id,
                    userName: responseJson.user.name,
                    email : responseJson.user.email,
                    photo : responseJson.user.photo,
                    //apiToken: responseJson.apiToken,

                });
                alert("It has been successfully updated");
                //this.props.navigation.navigate('Main');
            } else {
                alert("Failed to update profile");
            }
        })
        .catch( error => {
            RNProgressHud.dismiss();
            alert("Network error...");
            return;            
        }) 

        /*
        var API_URL = BASE_URL + "/api/updateuser";
        
        fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: 14,
                    userName: "abc",                                        
                    photo: "",
                })
            }
        )
        .then(response => response.json())
        .then(responseJson => {

            RNProgressHud.dismiss();

            if (responseJson.success == "success") {
                
                this.props.setUser({
                    userId: responseJson.user.id,
                    userName: responseJson.user.name,
                    email : responseJson.user.email,
                    photo : responseJson.user.photo,
                    //apiToken: responseJson.apiToken,

                });                
                this.props.navigation.navigate('Main');
            } else {
                alert("Failed to update profile" + responseJson.toString());
            }
        })
        .catch( error => {
            RNProgressHud.dismiss();
            alert("Network error...");
            return;            
        });    
        */

    }
    
}
const mapDispatchToProps = dispatch => {
    return {
        setUser : user => { dispatch(setUser(user)) },        
    }
}

export default connect(null, mapDispatchToProps)(Profile)
