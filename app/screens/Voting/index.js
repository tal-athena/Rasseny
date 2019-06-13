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

      question_value: [],
      question_select: [],
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.voting !== this.props.voting) {
      
      //this.state.question_value = new Array(nextProps.voting.question.length);
      //this.state.question_select = new Array(nextProps.voting.question.length);
      
      this.setState({
        question_value: new Array(nextProps.voting.question.length),
        question_select: new Array(nextProps.voting.question.length),
      })
      /*
      this.setState({
        question1_selected : null,
        question1_value: null,
        question2_value: null,
        question3_value: null,
      })
      */
    }
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    this.setState({
      question_value: new Array(this.props.voting.question.length),
      question_select: new Array(this.props.voting.question.length),
    })
  }

  render() {
    
    var buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    var content = [];
    if (!(this.props.voting === null || this.props.voting === undefined)) {
      this.props.voting.question.map((item, index) => {
        if (item.type == 1) {

          content.push(
            <View key = {index} style = {styles.questionSection}>
              <Text style = {styles.question} >{index + 1}. {item.question}</Text>
              <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginLeft:10, marginRight:10}}>
                <Picker style = {styles.picker}
                  selectedValue = {this.state.question_value[index]}                            
                  onValueChange={(itemValue, itemIndex) =>  {
                      this.state.question_value[index] = itemValue;
                      this.state.question_select[index] = itemIndex;
                      this.setState({question_value: this.state.question_value});
                    }                                  
                  }>
                  {
                    item.question_op.map((op_item, op_index) => (
                      <Picker.Item key = {op_index} label={op_item} value={op_item} />                  
                    ))
                  }              
                </Picker>
              </View>
            </View>);
        } else if (item.type == 2) {
          
          content.push(
            <View key = {index} style = {styles.questionSection}>
              <Text style = {styles.question} >{index + 1}. {item.question}</Text>
              
              <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <ButtonGroup
                onPress={(itemIndex) => 
                  { 
                    this.state.question_value[index] = itemIndex; /*this.setState({question2_value: index}) */
                    this.state.question_select[index] = itemIndex;
                    this.setState({question_value: this.state.question_value});
                  }}
                selectedIndex={this.state.question_value[index]}
                buttons={buttons}
                containerStyle={{height: 50}}
              />           
              </View>
            </View>
          );

        } else if (item.type == 3) {
          content.push(
            <View key = {index} style = {styles.questionSection}>
              <Text style = {styles.question} >{index + 1}. {item.question}</Text>
              {
                item.question_op.map((op_item, op_index) => (
                  <View key = {op_index} style = {styles.radioView}>
                    <RadioButton
                        key = {op_index}
                        animation={'bounceIn'}
                        isSelected={this.state.question_select[index] === op_index? true:false}
                        innerColor={'#852c50'}
                        outerColor={'#ddd'}
                        onPress={() => 
                          { 
                            this.state.question_select[index] = op_index;

                            this.state.question_value[index] = op_item;
                            this.setState({question_select: this.state.question_select});
                          }}
                    />
                    <Text style = {styles.radioText}>{op_item}</Text>
                  </View>
                ))
              }    
            </View>
          );
        }
      });
      }
    return (      
      <Container style = {styles.container}>
        <Text style = {styles.title}>
          {this.props.voting.title}
        </Text>
        <Content>            
            {content}      
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

    /*
    if (this.state.question1_value === null || this.state.question2_value === null || this.state.question3_value == null) {
      alert("Please select answer");
      return;
    }
    */
    for (var i = 0; i < this.props.voting.question.length; i ++) {      
      var element = this.state.question_value[i];
      if (element === undefined || element === "" || element === null) {
        alert("Please select all answers");
        return;
      }
    }

    RNProgressHud.showWithStatus("Please wait a moment");
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
              answer : this.state.question_value,
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
    voting: state.voting,
    user: state.user,
   };
};

export default connect(mapStateToProps)(Voting);