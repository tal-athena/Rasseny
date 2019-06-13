import React from 'react';
import { Picker, View, Text, TextInput} from 'react-native';

import {
  Container,
  Content,
  Button,
} from "native-base";

import RadioButton from 'react-native-radio-button';
import NumericInput from 'react-native-numeric-input'
import { Slider } from 'react-native-elements';
import {getItem} from '../../api';

import styles from './styles';
import store from '../../store/configureStore';
import {setNewSurvey} from '../../actions';
import {connect} from "react-redux";

import {ButtonGroup} from 'react-native-elements';

class AdminVoting extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {      
      
      question1: null,
      question1_op: [],
      ans1:"",
      question2: null,
      
      question3: null,
      question3_op: [],
      ans3:"",
      question1_selected: null,
      question1_value:0,
      question2_value:0,
      question3_value:0, 
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.survey !== this.props.survey) {
      this.setState({
        question1 : "",
        question1_op: [],
        question2: "",
        question3: "",
        question3_op: [],
      })
    }
  }
  render() {
  /*
    <Slideshow 
              dataSource={this.state.question2_pictures}
              position={this.state.question2_value}
              onPositionChanged={position => this.setState({ question2_value: position })} />  
    */
   var buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return (      
      <Container style = {styles.container}>        
        <Content>
            <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%'}}>
            <Text style = {styles.question}>1.</Text>
            <TextInput 
              style = {styles.questionInput} 
              placeholder = "Please input question"
              value = {this.state.question1}
              onChangeText = {(text) => this.setState({question1: text})}
            />
            </View>
            <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, margin: 20}}>
              <Picker style = {styles.picker}
                selectedValue = {this.state.question1_selected}                            
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({question1_selected: itemValue, question1_value: itemIndex})
                }>
                {
                  this.state.question1_op.map((item, index) => (
                    <Picker.Item key = {index} label={item} value={item} />                  
                  ))
                }              
              </Picker>
            </View>
            <View style = {{flexDirection: 'row'}}>
              <TextInput 
                style = {styles.questionInput2} 
                placeholder = "Please input available answer"
                value = {this.state.ans1}
                onChangeText = {(text) => this.setState({ans1: text})}
              />
              <Button style = {styles.addAnswerButton} onPress = {() => this.onAddAnswerToFirstQuestion()}>
                <Text style = {{color:"#fff"}}>Add a answer</Text>
              </Button>
            </View>
            <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%', marginTop: 30,}}>
              <Text style = {styles.question} >2. </Text>
              <TextInput 
                style = {styles.questionInput} 
                placeholder = "Please input question"
                value = {this.state.question2}
                onChangeText = {(text) => this.setState({question2: text})}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <ButtonGroup
              onPress={(index) => {this.setState({question2_value: index})}}
              selectedIndex={this.state.question2_value}
              buttons={buttons}
              containerStyle={{height: 50}}
            />           
            </View>           
            <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%', marginTop: 30,}}>
              <Text style = {styles.question} >{"3. "}</Text>
              <TextInput 
                style = {styles.questionInput} 
                placeholder = "Please input question"
                value = {this.state.question3}
                onChangeText = {(text) => this.setState({question3: text})}
              />
            </View>
            {
              this.state.question3_op.map((item, index) => (
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
            <View style = {{flexDirection: 'row', marginTop: 10}}>
              <TextInput 
                style = {styles.questionInput2} 
                placeholder = "Please input available answer"
                value = {this.state.ans3}
                onChangeText = {(text) => this.setState({ans3: text})}
              />
              <Button style = {styles.addAnswerButton} onPress = {() => this.onAddAnswerToThirdQuestion()}>
                <Text style = {{color : '#fff'}}>Add a answer</Text>
              </Button>
            </View>
            <Button style = {styles.submitButton} onPress = {() => {this.onNext();}}>
              <Text style = {{color : '#fff'}}>Next</Text>
            </Button>      
        </Content>
      </Container>    
    );
  }
  onAddAnswerToFirstQuestion() {

    if (this.state.ans1 == "")
      return;

      var word = this.state.ans1;

      var op = this.state.question1_op.find(function(element) {
          return element == word;
      });
      if (op !== null && op !== undefined) {
        alert("That option already exist");
        return;
      }

      this.state.question1_op.push(this.state.ans1);
      this.setState({ans1: ""});
      
  }
  onAddAnswerToThirdQuestion() {

    if (this.state.ans3 == "")
    return;

    var word = this.state.ans3;

    var op = this.state.question3_op.find(function(element) {
        return element == word;
    })
    
    if (op !== null && op !== undefined) {
      alert("That option already exist");
      return;
    }

    this.state.question3_op.push(this.state.ans3);
    this.setState({ans3: ""});    
  }
  onNext() {

    if (this.state.question1 == "") {
      alert("Please input first question");
      return;
    }
    if (this.state.question1_op.length == 0) {
      alert("Please input first question's opinion");
      return;
    }
    if (this.state.question2 == "") {
      alert("Please input second question");
      return;
    }
    if (this.state.question3 == "") {
      alert("Please input third question");
      return;
    }
    if (this.state.question3_op.length == 0) {
      alert("Please input third question's opinion");
      return;
    }

    this.props.setNewSurvey({
      type : 1,
      password: this.props.survey.password,
      question1: this.state.question1,
      question1_op: this.state.question1_op,
      question2: this.state.question2,
      question3: this.state.question3,
      question3_op: this.state.question3_op,
    });

    this.props.navigation.navigate('AdminFinish');
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminVoting)

