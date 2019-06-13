import React, { Component } from 'react';
import { 
    Text ,
    View, 
    TextInput,  
    Image,
    Keyboard,
    AsyncStorage
} from 'react-native';

import RNProgressHud from "react-native-progress-display";

import styles from './styles';

import {
    Container,
    Button,    
    Content
} from "native-base";


const launchscreenLogo = require("../../assets/logo2.png");

import {setUser} from "../../actions";
import {connect} from "react-redux";
import {BASE_URL} from "../../config";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",          
        };
      }
    render() {
        return (
            <Container style = {styles.container} >
                
                    <View style={styles.logoContainer}>
                        <Image source={launchscreenLogo} imageStyle = {{resizeMode:'stretch'}} style={styles.logo} />
                    </View>
                    <View style = {{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput placeholder = "Email "
                            placeholderTextColor = '#aaa'
                            style = {styles.inputBox}
                            onChangeText = {text => {this.setState({email:text})}}
                        />
                        <TextInput placeholder = "Password"
                            placeholderTextColor = '#aaa'
                            secureTextEntry = {true}
                            style = {styles.inputBox}
                            onChangeText = {text => {this.setState({password:text})}}
                        />
                        <Button onPress = { () => this.authenticate() } style= {styles.loginButton}>
                            <Text style = {{color:'#fff', fontSize: 16}}>Login</Text>
                        </Button>
                    </View>
                
            </Container>
        );
    }
    validate (text) {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct");
            this.setState({email:text})
            return false;
        }        
        else {

          this.setState({email:text})
          console.log("Email is Correct");
        }
    }
  authenticate() {
  //what i can do here to go to Socrce screen ???
        //alert("Success");

        Keyboard.dismiss();

        const email = this.state.email;
        const password = this.state.password;

        if (email == "" || password == "") {
            alert("Please input email and password");
            return;
        }

        if (this.validate(email) === false) {
            alert("Email address is invalid");
            return;
        }

        RNProgressHud.showWithStatus("Please wait a moment to login");
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
                    password:this.state.password
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

                AsyncStorage.setItem('email', this.state.email);
                AsyncStorage.setItem('password', this.state.password);

                this.setState({
                    email:"",
                    password:""
                })
                this.props.navigation.navigate('Main');
            } else {
                alert("Email or Password is not correct");
            }
        })
        .catch( error => {
            RNProgressHud.dismiss();
            alert("Network error...");
            return;            
        }) 
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        setUser : user => { dispatch(setUser(user)) }
    }
}

export default connect(null, mapDispatchToProps)(Login)