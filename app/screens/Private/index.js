import React from 'react';
import { RefreshControl, View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";

import {
  Container,
  Button,
} from "native-base";
import {SearchBar, Input} from 'react-native-elements';

import styles from './styles';
import ListItem from '../../components/ListItem';
import { TextInput, FlatList} from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';

import RNProgressHud from "react-native-progress-display";
import {BASE_URL, BUTTON_BACK_COLOR} from "../../config";


import {setVoting} from '../../actions';
import {setRating} from '../../actions';
import {setBrain} from '../../actions';

import {connect} from "react-redux";
import FastImage from 'react-native-fast-image';

class Private extends React.Component {

  constructor(props) {
    super(props);
    props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
    this.arrayholder = [];
    this.state = {
      works: [],
      search:"",
      isRefreshing: false,
      modalVisibility: false,
      password: "",
      survey_id: null,
      availableNames:[],
      addPrivateModalVisibility: false,

      priName: "",
      priItem:null,
    };
    
  }

  _onRefresh = () => {
    
    this.componentWillMount();
    this.setState({ isRefreshing: false });
  }

  static navigationOptions = () => {

    return {

      tabBarOnPress({ navigation, defaultHandler }) {
        // perform your logic here
        navigation.state.params.onTabFocus();

        alert("abc");

        // this is mandatory to perform the actual switch
        // don't call this if you want to prevent focus
        defaultHandler();
      }
    };
  };
  componentWillMount() {
    
    fetch(
      BASE_URL + "/api/getallprivate",
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId:this.props.user.userId,            
          })
      }
    )
    .then(response => response.json())
    .then(responseJson => {
        
        if (responseJson.success == "success") {
            
          this.arrayholder = responseJson.data;
            this.setState({              
                works: responseJson.data,
            });

        } else {
          this.arrayholder = [];
          this.setState({          
            works:[]
          })        
        }
    })
    .catch( error => {
        alert("Network error...");
        return;            
    })
    
    this.getAvailableNames();    
  }

  getAvailableNames = () => {

    fetch (
      BASE_URL + "api/getallprivatenames",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          userId: this.props.user.userId,
        })
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.success == "success") {
        this.state.availableNames = responseJson.data;
      } else {
        this.state.availableNames = [];
      }
    });
  }



  renderHeader = () => {    
    return (
      <View style = {{marginBottom:10}}>
        <SearchBar        
          placeholder="Type Here..."                
          round     
          value = {this.state.search}   
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}        
        />
      </View>    
    );  
  }
  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {      

      const itemData = item.title.toUpperCase();
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });

    this.setState({ search: text, works: newData });  
  }
  
  render() {

    return (
      <Container style = {styles.container}>
        <Modal
            style={{ justifyContent: "center"}}
            onBackButtonPress={() => this.setState({modalVisibility: false})}
            isVisible={this.state.modalVisibility}
            onBackdropPress={() => this.setState({modalVisibility: false})}
        >
          <View style = {styles.modalContent}>          
            <TextInput placeholder = "Password"
                placeholderTextColor = '#aaa'
                secureTextEntry = {true}
                style = {styles.inputBox}
                onChangeText = {text => {this.setState({password : text})}}
            />
            <Button onPress = { () => this._onCheckPassword() } style= {styles.loginButton}>
                <Text style = {{color:'#fff', fontSize: 16}}>OK</Text>
            </Button>
          </View>
        </Modal>

        <Modal
            style={{ justifyContent: "center"}}
            onBackButtonPress={() => this.setState({addPrivateModalVisibility: false})}
            isVisible={this.state.addPrivateModalVisibility}
            onBackdropPress={() => this.setState({addPrivateModalVisibility: false})}
        >
          <View style = {styles.addPrivateModalContent}>          
            <SearchableDropdown
                            
              onTextChange={text => this.setState({priName: text})}
              onItemSelect={item => this.setState({priItem: item})}
              containerStyle={{ padding: 5 }}
              placeholderTextColor = "#ccc"              
              textInputStyle={styles.privateTextInput}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: BUTTON_BACK_COLOR,
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#fff' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={this.state.availableNames}
              defaultIndex={0}
              placeholder="input private vote name"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
            <Button onPress = { () => this._onAddPrivate() } style= {styles.loginButton}>
                <Text style = {{color:'#fff', fontSize: 16}}>Add</Text>
            </Button>
          </View>
        </Modal>

        <View style = {{position: 'absolute', right:10, bottom: 10, zIndex:100000}}>
          <TouchableOpacity onPress={ () => this._onOpenAddPrivateModal() }>
            <FastImage
              style={{width: 40, height:40}}
              source={require('../../assets/add_white.png')}                            
            />
          </TouchableOpacity>
        </View>
        <FlatList
            ListHeaderComponent = {this.renderHeader}
            data = {this.state.works}

            keyExtractor={(item, index) => index.toString()} 

            renderItem = {({item, index}) => (
              <ListItem imageDat = {item.picture}              
                title = {item.title}                                
                frequency = {item.frequency} 
                style = {styles.item} 
                userName = {item.userName}
                onPress = {() => this.onClickItem(item.id)}
                />
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                colors={["#EA0000"]}
                tintColor="white"
                title="loading..."
                titleColor="white"
                progressBackgroundColor="white"
              />}
        />
      </Container>
    );
  }

  _onOpenAddPrivateModal() {

    this.setState({priItem: null, addPrivateModalVisibility: true});    
  }

  _onAddPrivate() {
    this.setState({addPrivateModalVisibility: false});
    //alert(JSON.stringify(this.state.priItem));

    if (this.state.priItem === null) {
    	alert("Incorrect private vote name");
    	return;
    }


    for (var i = 0; i < this.state.works.length; i ++) {
      if (this.state.works[i].id == this.state.priItem.id) {
        
        alert("You have already joined");
        return;
      }
    }

    fetch (
      BASE_URL + "api/linkprivate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          userId: this.props.user.userId,
          surveyId: this.state.priItem.id,
        })
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.success == "success") {
        this.state.works.push(responseJson.data);
        this.setState({works:this.state.works});
      } else {
        alert("Failed to add private vote")        
      }
    });

  }
  onClickItem (id) {
    
    this.setState({survey_id: id, modalVisibility: true});
  
  }
  _onCheckPassword() {

    this.setState({modalVisibility:false});

    RNProgressHud.showWithStatus("Please wait a moment");

    var id = this.state.survey_id;

    var survey = this.state.works.find(function(element) {
      return element.id == id;
    });

    fetch(
      BASE_URL + "api/checkpassword",
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              id : this.state.survey_id,
              password: this.state.password,  
          })
      }
    )
    .then(response => response.json())
    .then(responseJson => {        
        if (responseJson.success == "success") {            
            this._onLoadTemplate(survey);
        } else {
            RNProgressHud.dismiss();
            alert("Password is not correct");            
        }
    })
    .catch( error => {
        RNProgressHud.dismiss();
        alert("Network error...");
        return;            
    }) 
  }

  _onLoadTemplate(survey) {
    
    if (survey.type == 1) {
      
      fetch(
        BASE_URL + "api/getvoting",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                survey_id: survey.id,
                user_id : this.props.user.userId,
                id : survey.link_id,                
            })
        }
      )
      .then(response => response.json())
      .then(responseJson => {
          RNProgressHud.dismiss();
          if (responseJson.success == "success") {
              
              this.props.setVoting({
                  
                  survey_id: survey.id,
                  template_id: survey.link_id,
                  title: survey.title,
                  question: responseJson.data, 
                  /*
                  question1: responseJson.data.question_1,
                  question1_op: responseJson.data.question_1_op,
                  question2: responseJson.data.question_2,
                  question3: responseJson.data.question_3,
                  question3_op: responseJson.data.question_3_op,                
                  */

              });
              this.props.navigation.navigate('Voting');
          } else if (responseJson.success == "already") {
            alert("You have already submitted");
          }  else {
              alert("Failed to load data");
          }
      })
      .catch( error => {
          RNProgressHud.dismiss();
          alert("Network error...");
          return;            
      })     
    }
    else if (survey.type == 2) {

      fetch(
        BASE_URL + "api/getrating",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                survey_id: survey.id,
                user_id : this.props.user.userId,
                id : survey.link_id,                
            })
        }
      )
      .then(response => response.json())
      .then(responseJson => {
          RNProgressHud.dismiss();
          if (responseJson.success == "success") {
              
              this.props.setRating({                  
                survey_id: survey.id,
                template_id: survey.link_id,
                title: survey.title,
                question: responseJson.data.question,
                question_words: responseJson.data.question_words,
              });

              //alert(JSON.stringify({responseJson}));

              this.props.navigation.navigate('Rating');
          } else if (responseJson.success == "already") {
            alert("You have already submitted");
          }  else {
              alert("Failed to load data");
          }
      })
      .catch( error => {
          RNProgressHud.dismiss();
          alert("Network error...");
          return;            
      })  
    } else if (survey.type == 3) {

      fetch(
        BASE_URL + "api/getbrain",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                survey_id: survey.id,
                user_id : this.props.user.userId,
                id : survey.link_id,                
            })
        }
      )
      .then(response => response.json())
      .then(responseJson => {
          RNProgressHud.dismiss();
          if (responseJson.success == "success") {
              
              this.props.setBrain({
                  
                survey_id: survey.id,
                template_id: survey.link_id,
                title: survey.title,
                question: responseJson.data.question,
                question_op: responseJson.data.question_op,

              });

              this.props.navigation.navigate('BrainStorming');
          } else if (responseJson.success == "already") {
            alert("You have already submitted");
          }  else {
              alert("Failed to load data");
          }
      })
      .catch( error => {
          RNProgressHud.dismiss();
          alert("Network error...");
          return;            
      }) 
    } else {
      RNProgressHud.dismiss();
      alert("Unknown error");
    }
  }
  handleTabFocus = () => {
    alert("abc");
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setVoting : voting => { dispatch(setVoting(voting)) },
      setRating : rating => { dispatch(setRating(rating)) },
      setBrain : brain => { dispatch(setBrain(brain)) }
  }
}
const mapStateToProps = state => {
  return {     
    user: state.user,  
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Private)
