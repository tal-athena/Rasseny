import React from 'react';
import { Picker, View, Text } from 'react-native';
import RNProgressHud from "react-native-progress-display";

import {
  Container,
  Content,
  Button,
} from "native-base";

import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import styles from './styles';
import {BASE_URL} from '../../config';

import {ButtonGroup} from 'react-native-elements';

export class Voting extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      question1_selected : null,
      question1_value: null,
      question2_value: null,
      question3_value: null,

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.voting !== this.props.voting) {
      this.setState({
        question1_selected : null,
        question1_value: null,
        question2_value: null,
        question3_value: null,
      })
    }
  }
  componentWillMount() {
    
  }

  render() {
    
    var buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return (      
      <Container style = {styles.container}>
        <Text style = {styles.title}>
          {this.props.voting.title}
        </Text>
        <Content>
            <Text style = {styles.question} >{"1. " + this.props.voting.question1}</Text>
            <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginLeft:10, marginRight:10}}>
              <Picker style = {styles.picker}
                selectedValue = {this.state.question1_selected}                            
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({question1_selected: itemValue, question1_value: itemIndex})
                }>
                {
                  this.props.voting.question1_op.map((item, index) => (
                    <Picker.Item key = {index} label={item} value={item} />                  
                  ))
                }              
              </Picker>
            </View>
            <Text style = {styles.question} >{"2. " + this.props.voting.question2}</Text>
            
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <ButtonGroup
              onPress={(index) => {this.setState({question2_value: index})}}
              selectedIndex={this.state.question2_value}
              buttons={buttons}
              containerStyle={{height: 50}}
            />           
            </View>           
            
            <Text style = {styles.question} >{"3. " + this.props.voting.question3}</Text>
            {
              this.props.voting.question3_op.map((item, index) => (
                <View key = {index} style = {styles.radioView}>
                  <RadioButton
                      key = {index}
                      animation={'bounceIn'}
                      isSelected={this.state.question3_value === index? true:false}
                      innerColor={'#852c50'}
                      outerColor={'#ddd'}
                      onPress={() => this.setState({ question3_value: index })}
                  />
                  <Text style = {styles.radioText}>{item}</Text>
                </View>
              ))
            }         
            <Button 
              style = {styles.submitButton}
              onPress = {() => this._onSubmit()}
              >
              <Text style = {{color: '#fff'}}>Submit</Text>
            </Button>               
        </Content>
      </Container>    
    );
  }

  _onSubmit() {

    if (this.state.question1_value === null || this.state.question2_value === null || this.state.question3_value == null) {
      alert("Please select answer");
      return;
    }

    RNProgressHud.showWithStatus("Processing...");
    fetch(
      BASE_URL + "api/addvotinganswer",
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              survey_id : this.props.voting.survey_id,
              user_id : this.props.user.userId,
              question_1_value: this.state.question1_value,
              question_2_value: this.state.question2_value,
              question_3_value: this.state.question3_value,
          })
      }
    )
    .then(response => response.json())
    .then(responseJson => {

        RNProgressHud.dismiss();

        if (responseJson.success == "success") {

            alert("Submit success");
            this.props.navigation.navigate('Main');

        } else {

            alert("Failed to submit\nPlease try again");
        }
    })
    .catch( error => {
        RNProgressHud.dismiss();
        alert("Network error...");
        return;            
    })
  }
}

const mapStateToProps = state => {
  return { 
    voting: state.voting,
    user: state.user,
   };
};

export default connect(mapStateToProps)(Voting);