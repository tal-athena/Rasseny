import React from 'react';
import { TextInput, View, Text} from 'react-native';

import {
  Container,
  Content,
  Button,

} from "native-base";


import styles from './styles';
import {setNewSurvey} from '../../actions';
import {connect} from "react-redux";

class AdminRating extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      question:null,
      suggestions: [],      
      answer: null,
      sug_word: "",
      sug_strength: '80',      
    }
  }
  
  componentWillReceiveProps(nextProps) {

    if (nextProps.survey != this.props.survey) {

      this.setState({
        question:"",              
        suggestions: [],        
        answer: null,
        sug_word: "",
        sug_strength: '80',     
      });
    }
  }
  render() {

    var greenButtons = [], blueButtons = [], redButtons = [];    
    
    for (var i = 0; i < this.state.suggestions.length; i ++) {
      if (this.state.suggestions[i].strength >= 70) {
        greenButtons.push( <Button style = {styles.greenButton} key = {i}>
                            <Text style = {{color: '#0e0', margin: 5}}>{this.state.suggestions[i].word}</Text>
                          </Button>);
      }
      else if (this.state.suggestions[i].strength >= 50) {
        blueButtons.push( <Button style = {styles.blueButton} key = {i} >
                            <Text style = {{color: '#00e' , margin: 5}}>{this.state.suggestions[i].word}</Text>
                          </Button>);
      } else {
        redButtons.push( <Button style = {styles.redButton} key = {i}>
                          <Text style = {{color: '#e00', margin: 5}}>{this.state.suggestions[i].word}</Text>
                        </Button>);
      }
    }

    return (      
      <Container style = {styles.container}>        
        <TextInput 
            style = {styles.questionInput} 
            placeholder = "Please input question"
            value = {this.state.question}
            onChangeText = {(text) => this.setState({question: text})}
        />
        <Content>            
              <View style = {styles.buttonGroupView}>
                {greenButtons}
              </View>
              <View style = {styles.buttonGroupView}>
                {blueButtons}
              </View>            
              <View style = {styles.buttonGroupView}>
                {redButtons}
              </View>
              <View style = {{flexDirection : 'row', justifyContent:'center'}}>
                <TextInput 
                  style = {styles.questionInput} 
                  placeholder = "Please input suggestion word"
                  value = {this.state.sug_word}
                  onChangeText = {(text) => this.setState({sug_word: text})}
                />
                <TextInput
                  style = {{borderBottomWidth: 1, textAlign: 'center'}}
                  value = {this.state.sug_strength}
                  onChangeText = {(value) => {(value >= 0 && value <= 100) ? this.setState({sug_strength: value}): null}}
                  keyboardType='numeric'
                  placeholder = "Strength"
                />
                <Button style = {styles.addAnswerButton} onPress = {() => this.onAddSuggestion()}>
                <Text style = {{color: "#fff"}} >Add</Text>
              </Button>
              </View>
              
        </Content>
        <Button style = {styles.submitButton} onPress = {() => this.onNext()}>
              <Text style = {{color: "#fff"}}>Next</Text>
            </Button>
      </Container>    
    );
  }
  onAddSuggestion() {

    if (this.state.sug_word == "")
      return;

    var word = this.state.sug_word;

    var op = this.state.suggestions.find(function(element) {
        return element.word == word;
    });
    if (op !== null && op !== undefined) {
      alert("That word already exist");
      return;
    }
      

    this.state.suggestions.push({'word': this.state.sug_word, 'strength': this.state.sug_strength});
    this.setState({sug_word: "", sug_strength: '80'});
  }
  onNext() {
    if (this.state.question == "") {
      alert("Please input question");
      return;
    }
    if (this.state.suggestions.length == 0) {
      alert("Please Input Suggestions");
      return;
    }

    this.props.setNewSurvey({
      type : 2,
      password:this.props.survey.password,      
      question:this.state.question,
      question_words:this.state.suggestions
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRating)
