import React from 'react';
import { View, Text, Image} from 'react-native';
import RNProgressHud from "react-native-progress-display";

import {
  Container,
  Content,
  Button,

} from "native-base";

import { connect } from 'react-redux';


import styles from './styles';
import {BASE_URL} from '../../config';

export class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {},
    } 
  }

  componentWillMount() {   
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.rating !== this.props.rating ) {
      this.setState({answer:{}});
    }
  }
  render() {   
    
    var greenButtons = [], blueButtons = [], redButtons = [];    
    
    var suggestions = this.props.rating.question_words;
    suggestions.map((item, index) => {
      if (item.strength >= 70) {
        greenButtons.push( <Button 
                              style = {item.word != this.state.answer.word ? styles.greenButton: styles.greenButton_selected}
                              key = {index} 
                              onPress = {() => this._onSelectButton(item)}>
                            <Text style = {{color: '#0e0', margin: 5}}>{item.word}</Text>
                          </Button>);
      } else if (item.strength >= 50) {
          blueButtons.push( <Button style = {item.word != this.state.answer.word ? styles.blueButton: styles.blueButton_selected}
                                key = {index} 
                                onPress = {() => this._onSelectButton(item)}>
                              <Text style = {{color: '#00e' , margin: 5}}>{item.word}</Text>
                            </Button>);
      } else {
        redButtons.push( <Button style = {item.word != this.state.answer.word ? styles.redButton: styles.redButton_selected} 
                              key = {index}
                              onPress = {() => this._onSelectButton(item)}>
                          <Text style = {{color: '#e00', margin: 5}}>{item.word}</Text>
                        </Button>);
      }
    })    
    return (      
      <Container style = {styles.container}>
        <Text style = {styles.title}>
          {this.props.rating.title}
        </Text>
        <Text style = {styles.question}>
          {this.props.rating.question}
        </Text>
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
  _onSelectButton(word) {
    this.setState({answer: word});
  }
  _onSubmit() {
    
    if (this.state.answer.word == null || this.state.answer.strength == null) {
      alert("Please select a answer");
      return;
    }

    RNProgressHud.showWithStatus("Please wait a moment");
    fetch(
      BASE_URL + "api/addratinganswer",
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              survey_id : this.props.rating.survey_id,
              user_id : this.props.user.userId,
              word: this.state.answer.word,
              strength: this.state.answer.strength,
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
    rating: state.rating,
    user: state.user,
   };
};

export default connect(mapStateToProps)(Rating);