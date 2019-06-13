import React from 'react';
import { Picker, View, Text} from 'react-native';
import RNProgressHud from "react-native-progress-display";

import {
  Container,
  Content,
  Button,
} from "native-base";

import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import {BASE_URL} from '../../config';

import styles from './styles';


export class BrainStorming extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {      
      question_op_selected: null,
      question_answer: null,        
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.brain !== this.props.brain) {
      this.setState({question_op_selected: null, question_answer: null});
    }
  }
  componentWillMount() {    
  }
  render() {

    return (      
      <Container style = {styles.container}>
        <Text style = {styles.title}>
          {this.props.brain.title}
        </Text>
        <Text style = {styles.question} >{this.props.brain.question}</Text>
        <Content>            
          {
              this.props.brain.question_op1.map((item, index) => (
                <View key = {index} style = {styles.radioView}>
                  <RadioButton
                      key = {index}
                      animation={'bounceIn'}
                      isSelected={this.state.question_op_selected === index? true:false}
                      innerColor={'#852c50'}
                      outerColor={'#ddd'}
                      onPress={() => this.setState({ question_op_selected: index, question_answer: item })}
                  />
                  <Text style = {styles.radioText}>{item}</Text>
                </View>
              ))
            }
            <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginLeft: 10, marginRight: 10}}>
              <Picker style = {styles.picker}
                selectedValue = {this.state.question_answer}                            
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({question_answer: itemValue, question_op_selected: null})
                }>
                {
                  this.props.brain.question_op2.map((item, index) => (
                    <Picker.Item key = {index} label={item} value={item} />                  
                  ))
                }              
              </Picker>
            </View>
                        
            <Button style = {styles.submitButton}
              onPress = {() => this._onSubmit()}
              >
              <Text style = {{color: '#fff'}}>Submit</Text>
            </Button>               
        </Content>
      </Container>    
    );
  }
  _onSubmit() {

    if (this.state.question_answer === null) {
      alert("Please select answer");
      return;
    }
    RNProgressHud.showWithStatus("Please wait a moment");
    fetch(
      BASE_URL + "api/addbrainanswer",
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              survey_id : this.props.brain.survey_id,
              user_id : this.props.user.userId,
              question_answer: this.state.question_answer,              
          })
      }
    )
    .then(response => response.json())
    .then(responseJson => {

        RNProgressHud.dismiss();

        if (responseJson.success == "success") {

            alert("It has been successfully submitted");
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
    brain: state.brain,
    user: state.user,
   };
};

export default connect(mapStateToProps)(BrainStorming);