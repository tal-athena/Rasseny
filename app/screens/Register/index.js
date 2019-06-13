import React, { Component } from 'react';
import { Text ,TextInput,View, Image} from 'react-native';

import styles from './styles';

import {
    Container,    
    Content,
    Button,       
} from "native-base";
import {BASE_URL} from '../../config'

import RNProgressHud from "react-native-progress-display";

const launchscreenLogo = require("../../assets/logo2.png");

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          email: "",
          password1: "",
          password2: "",          
        };
      }
    render() {
        return (
            <Container style = {styles.container} >
            <Content>
                <View style={styles.logoContainer}>
                    <Image source={launchscreenLogo} imageStyle = {{resizeMode:'stretch'}} style={styles.logo} />
                    {/*
                    <Text style = {{color: 'rgb(140, 140, 140)', fontSize:22, marginTop: 5, marginBottom: 10,}}>Together Think Better</Text>
                    <Text style = {{}}>Powered By ZaKreators</Text>
                    */}
                </View>

                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <TextInput placeholder = "Email "
                        placeholderTextColor = '#aaa'
                        onChangeText = {text => {this.setState({email: text})}}
                        style = {styles.inputBox}
                    />
                    <TextInput placeholder = "User Name"
                        placeholderTextColor = '#aaa'
                        onChangeText = {text => {this.setState({username: text})}}
                        style = {styles.inputBox}
                    />
                    <TextInput placeholder = "Password"
                        secureTextEntry = {true}
                        placeholderTextColor = '#aaa'
                        onChangeText = {text => {this.setState({password1: text})}}
                        style = {styles.inputBox}
                    />
                    <TextInput placeholder = "Confirm Password"
                        placeholderTextColor = '#aaa'
                        secureTextEntry = {true}
                        onChangeText = {text => {this.setState({password2: text})}}
                        style = {styles.inputBox}
                    />
                    <Button onPress = { () => this.registerUser() } style= {styles.registerButtion}>
                        <Text style = {{color:'#fff', fontSize: 16}}>Register</Text>
                    </Button>
                </View>
                </Content>
            </Container>
            /*
            <View style={styles.container}>
                <Text style={styles.title}>
                    HYGEX
                </Text>
                <View>
                    <TextInput
                        placeholder="Username"
                        style={styles.formInput}
                         />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={styles.formInput1}
                         />

                <TouchableHighlight style={styles.button}
                onPress={() => this.move()}>
                <Text style={styles.buttonText}>Login</Text>
               </TouchableHighlight>

                </View>
            </View> */
        );
    }

    validate = (text) => {
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
  registerUser() {
  //what i can do here to go to Socrce screen ???

        if (this.validate(this.state.email) === false) {
            alert("Email address is invalid");
            return;
        }

        if (this.state.username == "" || this.state.email == "" || this.state.password1 == "" || this.state.password2 == "") {
            alert("Please fill all fields");
            return;
        }

        if (this.state.password1.length < 6) {
            alert("Password length should be more than 6");
            return;
        }

        if (this.state.password1 != this.state.password2) {
            alert("Please confirm password");
            return;            
        }
        RNProgressHud.showWithStatus("Please wait a moment");

        var API_URL = BASE_URL + "/api/register";

        fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email:this.state.email,
                    password:this.state.password1,
                    role: 0,
                })
            }
        )
        .then(response => response.json())
        .then(responseJson => {
            RNProgressHud.dismiss();
            if (responseJson.success == "success") {                                
                this.setState({
                    username:"",
                    email:"",
                    password1:"",
                    password2:"",
                });

                alert("Success");
                this.props.navigation.navigate('Home');
            } else if (responseJson.success == "already") {
                
                alert("Email already exist");                
            } else {
                alert("Register failed");
            }
        })
        .catch( error => {
            
            RNProgressHud.dismiss();
            alert("Network error...");
            return;            
        })
    }
  }

  export default Register;