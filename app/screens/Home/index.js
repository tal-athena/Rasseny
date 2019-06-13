import React from 'react';
import { View, Text, Image, AsyncStorage} from 'react-native';
import RNProgressHud from "react-native-progress-display";

import {
  Container,
  Content,
  Button,

} from "native-base";
import {SocialIcon} from 'react-native-elements';

import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

//var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

import styles from './styles';

import {setUser} from "../../actions";
import {connect} from "react-redux";
import {BASE_URL} from '../../config'

const launchscreenLogo = require("../../assets/logo2.png");


GoogleSignin.configure({    
  webClientId: '434916370844-0h10ackestneac1rmirfln2g06j788h5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  
});


class Home extends React.Component {

  componentDidMount() {

    RNProgressHud.showWithStatus("Loading");

    AsyncStorage.getItem('email').then((email) => {
      
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      AsyncStorage.getItem('password').then((password) => {
        
        var API_URL = BASE_URL + "/api/login";
        
        fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            }
        )
        .then(response => response.json())
        .then(responseJson => {            
            
            RNProgressHud.dismiss();
            if (responseJson.success == "success") {
                
                this.props.setUser({
                    userId: responseJson.user.id,
                    userName: responseJson.user.userName,
                    email : responseJson.user.email,
                    photo : responseJson.user.photo,
                    //apiToken: responseJson.apiToken,

                });
                RNProgressHud.dismiss();
                this.props.navigation.navigate('Main');
                return;
            }
            RNProgressHud.dismiss();
        })
        .catch(err => {          
          RNProgressHud.dismiss();
        })
      }).catch(err => {
        RNProgressHud.dismiss();
      })
    }).catch(err => {      
      RNProgressHud.dismiss();
    })    
  }

  render() {
    return (
      <Container style={styles.container}>

        <View style={styles.logoContainer}>
            <Image source={launchscreenLogo} imageStyle = {{resizeMode:'stretch'}} style={styles.logo} />
            <Text style = {{color: 'rgb(140, 140, 140)', fontSize:24, marginTop: 30, marginBottom: 20,}}>Together Think Better</Text>
            {/*<Text>Powered By ZaKreators</Text> */}
        </View>   
          <View style = {{justifyContent: 'center', alignSelf:'flex-end'}}>
            {/*<SocialIcon 
              onPress = { () => this.loginWithFacebook() } 
              style = {styles.socialButton}
              button
              title = "Sign in with facebook"
              type='facebook'
            />*/}
            <SocialIcon 
              onPress = { () => this.loginWithGoogle() } 
              style = {styles.socialButton} 
              button
              title = "Sign in with google"
              type = "google-plus-official"
            />
          </View>

          {/*
          <View style = {{justifyContent: 'center', height: 80}}>
            <Text style = {{ alignSelf: 'center', color: '#FFF', fontSize: 22}}>
              (OR)
            </Text>
          </View>
          */}
          <View style = {{ alignItems:'center', flexDirection:'row', justifyContent: 'center'}}>
            <Button 
              onPress = {() => this.createAccount()}                
              style = {styles.createButton}
            >
              <Text style = {styles.loginText}>Create Account</Text>
            </Button>
            <Button 
              onPress = {() => this.loginButtonPressed()}                
              style = {styles.loginButton}            
            >
              <Text style = {styles.loginText}>Login</Text>
            </Button>
          </View>

      </Container> 
    );
  }
  
  loginButtonPressed() {
    
    this.props.navigation.navigate('Login');
  }
  loginWithFacebook() {

    
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          //alert("Facebook login Cancelled");
          console.log('Login was cancelled');
        } else {
          //alert("Facebook login Success");
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());

            RNProgressHud.showWithStatus("Please wait a moment");

            AccessToken.getCurrentAccessToken().then((data) => {
              const { accessToken } = data
              
              fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + accessToken)
              .then((response) => response.json())
              .then((json) => {
                // Some user object has been set up somewhere, build that user here
                
                this.loginWithSocial(1, json.name, json.email, accessToken);
                
              })
              .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
              })
              
            })       

        }
      },
      function (error) {
        alert("Facebook login Error");
        console.log('Login failed with error: ' + error);
      }
    );
    
    /*  
   FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native
 
   FBLoginManager.loginWithPermissions(["email"], function(error, data){
     if (!error) {
       alert("Face book Login Success" + JSON.stringify(data));
       console.log("Login data: ", data);
     } else {
        alert("Face book Login Failed" + JSON.stringify(error));
       console.log("Error: ", error);
     }
   })
   */
  }
  
  loginWithGoogle = async() => {

    RNProgressHud.showWithStatus("Please wait a moment");
    console.log("Google login start");
    try {

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();

      //alert("Google Login Success" + JSON.stringify(userInfo));

      
      console.log("Login success : " + userInfo.user.name + ":" + userInfo.user.email + ":" + userInfo.user.id);  
      this.loginWithSocial(2, userInfo.user.name, userInfo.user.email, userInfo.user.id, userInfo.user.photo);
      

      //this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert("Google Login Canceled");
        // user cancelled the login flow        
        console.log("Google Login Canceled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert("Google Login Progress");
        // operation (f.e. sign in) is in progress already
        console.log("Google Login Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //alert("Google Login Not Available");
        // play services not available or outdated
        console.log("Google Login Not Available");
      } else {
        alert("Google Login Unknown error" + error);
        console.log("Google Login Unknown error" + error);
        // some other error happened
      }
      RNProgressHud.dismiss();
    }
    /*
   console.log("Google Login start");
   GoogleLoginManager.login(function(error, data){
    if (!error) {
      console.log("Login data: ", data);
    } else {
      console.log("Error: ", error);
    }
  });
  */
  }
  loginWithSocial = (type, name, email, token, photo) => {

    var API_URL = BASE_URL + "/api/loginsocial";

        fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: type,
                    email:email,
                    name: name,
                    password:token,
                    photo: photo,
                })
            }
        )
        .then(response => response.json())
        .then(responseJson => {
            RNProgressHud.dismiss();
            if (responseJson.success == "success") {
                
                this.props.setUser({
                    userId: responseJson.user.id,
                    userName: responseJson.user.userName,
                    email : responseJson.user.email,
                    photo : responseJson.user.photo,
                    //apiToken: responseJson.apiToken,

                });

                AsyncStorage.setItem('email', responseJson.user.email);
                AsyncStorage.setItem('password', token);
                
                this.props.navigation.navigate('Main');
            } else {
                alert("Failed to log in");
            }
        })
        .catch( error => {
            RNProgressHud.dismiss();
            alert("Network error..." + JSON.stringify(error));
            return;            
        }) 
        RNProgressHud.dismiss();
  }
  createAccount() {
    
    this.props.navigation.navigate('Register');
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setUser : user => { dispatch(setUser(user)) }
  }
}

export default connect(null, mapDispatchToProps)(Home)
