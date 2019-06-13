import React from 'react';
import { TextInput, Picker, View, Text, Image} from 'react-native';

import {
  Container,
  Content,
  Button,
} from "native-base";

import RadioButton from 'react-native-radio-button';
import {getItem} from '../../api';

import styles from './styles';
import store from '../../store/configureStore';
import {setNewSurvey} from '../../actions';
import {connect} from "react-redux";

class AdminBrainStorming extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {      
      question: "",
      question_op: [],
      
      question_op_selected: null,
      question_answer: null,
      ans : "",
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.survey !== this.props.survey) {
      this.setState({
        question:"",
        question_op:[],
        question_op_selected: null,
        ans:"",
        })
      }
  }
  render() {    
    return (      
      <Container style = {styles.container}>        
        <Content style = {{marginTop: 10}}>                      
            <TextInput 
              style = {styles.questionInput} 
              placeholder = "Please input question"
              value = {this.state.question}
              onChangeText = {(text) => this.setState({question: text})}
            />
            
            <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, margin: 20}}>
              <Picker style = {styles.picker}
                selectedValue = {this.state.question_op_selected}                            
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({question_op_selected: itemValue, question_answer: itemIndex})
                }>
                {
                  this.state.question_op.map((item, index) => (
                    <Picker.Item key = {index} label={item} value={item} />                  
                  ))
                }              
              </Picker>
            </View>
            <View style = {{flexDirection: 'row', marginTop: 10}}>
              <TextInput 
                style = {styles.questionInput} 
                placeholder = "Please input available answer"
                value = {this.state.ans}
                onChangeText = {(text) => this.setState({ans: text})}
              />
              <Button style = {styles.addAnswerButton} onPress = {() => this.onAdd()}>
                <Text style = {{color : '#fff'}}>Add a suggestion</Text>
              </Button>
            </View>                        
            <Button style = {styles.submitButton} onPress = {() => {this.onNext();}}>
              <Text style = {{color : '#fff'}}>Next</Text>
            </Button>               
        </Content>
      </Container>    
    );
  }
  onAdd() {

    if (this.state.ans == "")
      return;
    var ans = this.state.ans;

    var op = this.state.question_op.find(function(element) {
        return element == ans;
    });

    if (op !== null && op !== undefined) {
      alert("That answer already exist");
      return;
    }

    this.state.question_op.push(this.state.ans);
    this.setState({ans: ""});
  }

  onNext() {

    if (this.state.question == "") {
      alert("Please input question!");
      return ;
    }
    if (this.state.question_op.length == 0) {
      alert("Please input opinions");
      return;
    }
    
    this.props.setNewSurvey({
      type: 3,
      password: this.props.survey.password,      
      question:this.state.question,
      question_op:this.state.question_op
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminBrainStorming)
