import React from 'react';
import { View, Text, Image, TextInput} from 'react-native';

import RadioButton from 'react-native-radio-button';
import {
  Container,  
  Button,  
} from "native-base";
import styles from './styles';
import { Input } from 'react-native-elements';

const launchscreenLogo = require("../../assets/logo.png");

import {setNewSurvey} from "../../actions";
import {connect} from "react-redux";

class Admin extends React.Component {

  state = {
    isPrivate: false,
    password: null,
  }
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.survey !== this.props.survey)
      this.setState({isPrivate: false, password: null});
  }

  render() {
    return (

      <Container style = {styles.container}>
        <View style = {styles.title}>
        <Text style = {{fontSize : 17}}>Choose who can submit data to this survey</Text>
        </View>
        <View style = {styles.radioView}>
          <RadioButton              
              animation={'bounceIn'}
              isSelected={this.state.isPrivate === false? true:false}
              innerColor={'#852c50'}
              outerColor={'#ddd'}
              onPress={() => this.setState({ isPrivate: false })}
          />
          <Text style = {styles.radioText}>Everyone (Public)</Text>
        </View>
        
        <View style = {styles.radioView}>
          <RadioButton              
              animation={'bounceIn'}
              isSelected={this.state.isPrivate === true? true:false}
              innerColor={'#852c50'}
              outerColor={'#ddd'}
              onPress={() => this.setState({ isPrivate: true })}
          />
          <Text style = {styles.radioText}>Members of my organization</Text>
          
        </View>
          {
            this.state.isPrivate ? 
              (<View style = {{alignSelf: 'center'}}>
                <TextInput onChangeText = {(text) => this.setState({password: text})} value = {this.state.password} style = {styles.passwordInput} placeholder = "Password " />
              </View>) 
              : null
          }
        <Button
            onPress = {() => {this.onAdminVoting()}}            
            style = {styles.templateButton}
          >
            <Text style = {styles.loginText}>Template: Voting</Text>
        </Button>
        <Button
            onPress = {() => {this.onAdminRating()}}             
            style = {styles.templateButton}
          >
            <Text style = {styles.loginText}>Template: Rating</Text>
        </Button>
        <Button             
            onPress = {() => {this.onAdminSuggestion()}} 
            style = {styles.templateButton}
          >
            <Text style = {styles.loginText}>Template: Suggestions</Text>
        </Button>

      </Container>
    );
  }
  onAdminRating() {
    var pass = "";
    if (this.state.isPrivate === true) {
      pass = this.state.password;
      if (pass == null || pass == "") {
        alert("Please input password");
        return;
      }
    }

    this.props.setNewSurvey({
      password: pass,      
    });

    this.props.navigation.navigate('AdminRating');
  }
  onAdminVoting() {
    var pass = "";
    if (this.state.isPrivate === true) {
      pass = this.state.password;
      if (pass == null || pass == "") {
        alert("Please input password");
        return;
      }
    }
    this.props.setNewSurvey({
      password: pass,      
    });
    this.props.navigation.navigate('AdminVoting');
  }
  onAdminSuggestion() {
    var pass = "";
    if (this.state.isPrivate == true) {
      pass = this.state.password;
      if (pass == null || pass == "") {
        alert("Please input password");
        return;
      }
    }
    this.props.setNewSurvey({
      password: pass,      
    });
    
    this.props.navigation.navigate('AdminBrainStorming');
  }

}
  
const mapDispatchToProps = dispatch => {
  return {
      setNewSurvey : survey => { dispatch(setNewSurvey(survey)) }
  }
}
const mapStateToProps = state => {
  return { 
    survey: state.survey,    
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
