import React from 'react';
import { Picker, View, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
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
import FastImage from 'react-native-fast-image';

class AdminVoting extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {      
      
      question:[],
      ans:[],
      modalVisibility: false,      
      question_type: null,
      refresh: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.survey !== this.props.survey) {
   
      this.setState({
        question:[],
        ans:[],
        modalVisibility: false,      
        question_type: null,
        refresh: false,
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
   var content = [];

   this.state.question.map((item, index) => {
     if (item.type == 1) {

       content.push(
         <View key = {index} style = {styles.questionSection}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%'}}>
              <Text style = {styles.question}>{index + 1}.</Text>
                <TextInput 
                  style = {styles.questionInput} 
                  placeholder = "Please input question"
                  value = {item.question}
                  onChangeText = {(text) => {this.state.question[index].question = text; this.forceUpdate(); /*this.setState({question1: text})*/}}
                />
            </View>
            <View style = {{alignItems: 'center', justifyContent: 'center', borderWidth: 1, margin: 20}}>
              <Picker style = {styles.picker}
                /*selectedValue = {this.state.question1_selected}                            
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({question1_selected: itemValue, question1_value: itemIndex})
                }*/>
                {
                  this.state.question[index].question_op.map((op_item, op_index) => (
                    <Picker.Item key = {op_index} label={op_item} value={op_item} />                  
                  ))
                }              
              </Picker>
            </View>
            <View style = {{flexDirection: 'row'}}>
              <TextInput 
                style = {styles.questionInput2} 
                placeholder = "Please input available answer"
                value = {this.state.ans[index]}
                onChangeText = {(text) => {this.state.ans[index] = text; this.forceUpdate();/*this.setState({ans1: text})*/}}
              />
              <Button style = {styles.addAnswerButton} onPress = {() => {this.onAddAnswerQuestion(index)}}>
                <Text style = {{color:"#fff"}}>Add a answer</Text>
              </Button>
            </View>
         </View>);
     } else if (item.type == 2) {
       
       content.push(
         <View key = {index} style = {styles.questionSection}>
           <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%', marginTop: 30,}}>
              <Text style = {styles.question} >{index + 1}. </Text>
              <TextInput 
                style = {styles.questionInput} 
                placeholder = "Please input question"
                value = {this.state.question[index].question}
                onChangeText = {(text) => {this.state.question[index].question = text; this.forceUpdate();/*this.setState({question2: text}) */}}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <ButtonGroup
              //onPress={(index) => {this.setState({question2_value: index})}}
              //selectedIndex={this.state.question2_value}
              buttons={buttons}
              containerStyle={{height: 50}}
            />
         </View>
         </View>
       );

     } else if (item.type == 3) {
       content.push(
         <View key = {index} style = {styles.questionSection}>
           <View style = {{ flexDirection: 'row', alignItems: 'center', width:'100%', marginTop: 30,}}>
              <Text style = {styles.question} >{index + 1}.</Text>
              <TextInput 
                style = {styles.questionInput} 
                placeholder = "Please input question"
                value = {item.question}
                onChangeText = {(text) => {this.state.question[index].question = text; this.forceUpdate(); /*this.setState({question3: text}) */}}
              />
            </View>
            {
              this.state.question[index].question_op.map((op_item, op_index) => (
                <View key = {op_index} style = {styles.radioView}>
                  <RadioButton
                      key = {op_index}
                      animation={'bounceIn'}
                      //isSelected={this.state.question3_value === op_index? true:false}
                      innerColor={'#852c50'}
                      outerColor={'#ddd'}
                      //onPress={() => this.setState({ question3_value: op_index })}
                  />
                  <Text style = {styles.radioText}>{op_item}</Text>
                </View>
              ))
            }
            <View style = {{flexDirection: 'row', marginTop: 10}}>
              <TextInput 
                style = {styles.questionInput2} 
                placeholder = "Please input available answer"
                value = {this.state.ans[index]}
                onChangeText = {(text) => { this.state.ans[index] = text; this.forceUpdate(); /*this.setState({ans3: text}) */} }
              />
              <Button style = {styles.addAnswerButton} onPress = {() => this.onAddAnswerQuestion(index)}>
                <Text style = {{color : '#fff'}}>Add a answer</Text>
              </Button>
            </View>
         </View>
       );
     }
   });
    return (      
      <Container style = {styles.container}>        
        <Modal
            style={{ justifyContent: "center"}}
            onBackButtonPress={() => this.setState({modalVisibility: false})}
            isVisible={this.state.modalVisibility}
            onBackdropPress={() => this.setState({modalVisibility: false})}
        >
          <View style = {styles.modalContent}>          
                <View style = {styles.radioView}>
                  <RadioButton                      
                      animation={'bounceIn'}
                      isSelected={this.state.question_type === 1? true:false}
                      innerColor={'#eee'}
                      outerColor={'#fff'}
                      onPress={() => this.setState({ question_type: 1 })}
                  />
                  <Text style = {[styles.radioText, {color: '#fff'}]}>Choice Select Question</Text>
                </View>
                <View style = {styles.radioView}>
                  <RadioButton                      
                      animation={'bounceIn'}
                      isSelected={this.state.question_type === 2? true:false}
                      innerColor={'#eee'}
                      outerColor={'#fff'}
                      onPress={() => this.setState({ question_type: 2 })}
                  />
                  <Text style = {[styles.radioText, {color: '#fff'}]}>Ranking Question</Text>
                </View>
                <View style = {styles.radioView}>
                  <RadioButton                      
                      animation={'bounceIn'}
                      isSelected={this.state.question_type === 3? true:false}
                      innerColor={'#eee'}
                      outerColor={'#fff'}
                      onPress={() => this.setState({ question_type: 3 })}
                  />
                  <Text style = {[styles.radioText, {color: '#fff'}]}>Radio Select Question</Text>
                </View>
            <Button onPress = { () => this._onAddNewQuestion() } style= {styles.loginButton}>
                <Text style = {{color:'#fff', fontSize: 16}}>OK</Text>
            </Button>
          </View>
        </Modal>
        <Content>        
            {content}
            <View style = {{marginTop: 20, width: '100%', flexDirection: 'row', alignItems:'center', justifyContent: 'flex-end'}}>
              <Text style = {{marginRight: 5}}>
                Click to create
              </Text>
              <TouchableOpacity                 
                onPress={ () => this._onOpenModal() }>
                <FastImage
                  style={{width: 50, height:50, marginRight: 20}}
                  source={require('../../assets/add.png')}                            
                />
              </TouchableOpacity>
            </View>      
            <Button style = {styles.submitButton} onPress = {() => {this.onNext();}}>
              <Text style = {{color : '#fff'}}>Next</Text>
            </Button>

        </Content>
      </Container>    
    );
  }
  _onOpenModal() {    
    this.setState({modalVisibility: true});
  }
  _onAddNewQuestion() {

    if (this.state.question_type == 0) {
      alert("Please select question type");
      return;
    }
    this.setState({modalVisibility: false});

    this.state.question.push({
      type: this.state.question_type,
      question: "",
      question_op: []
    });
    this.setState({question_type: false});
  }
  onAddAnswerQuestion(index) {

    if (this.state.ans[index] == "")
      return;

      var word = this.state.ans[index];

      var op = this.state.question[index].question_op.find(function(element) {
          return element == word;
      });
      if (op !== null && op !== undefined) {
        alert("That option already exist");
        return;
      }

      this.state.question[index].question_op.push(this.state.ans[index]);
      this.state.ans[index] = "";

      this.forceUpdate();
      
  }
  
  onNext() {

    if (this.state.question.length == 0) {
      alert("Please create a question");
      return;
    }

    for (var i = 0; i < this.state.question.length; i ++) {
      var element = this.state.question[i];
      if (element.question == "") {
        alert("Please input all questions");
        return;
      }
      if (element.type != 2 && element.question_op.length == 0) {
        alert("Please input all information");
        return;
      }
    }
    
    this.props.setNewSurvey({
      type : 1,
      password: this.props.survey.password,
      question: this.state.question,
    });

    this.setState({question: []});
    
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

