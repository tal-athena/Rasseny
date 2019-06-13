import React from 'react';
import { RefreshControl, BackHandler, View } from 'react-native';

import {
  Container,
} from "native-base";
import {SearchBar} from 'react-native-elements';


import styles from './styles';
import ListItem from '../../components/ListItem';
import {FlatList } from 'react-native-gesture-handler';

import RNProgressHud from "react-native-progress-display";
import {BASE_URL, SURVEY_IMAGE_URL} from "../../config";
import { withNavigationFocus } from 'react-navigation';

import {setVoting} from '../../actions';
import {setRating} from '../../actions';
import {setBrain} from '../../actions';
import {setSide} from '../../actions';
import {connect} from "react-redux";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.arrayholder = [];
    this.state = {
      works: [],
      search:"",
      isRefreshing: false,
      isMain: true,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);    
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
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillMount() {    

    fetch(
      BASE_URL + "/api/getall",
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
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {

    //var state = this.props.navigation.state;
    //alert(JSON.stringify(this.props.navigation.state));
    
    //alert(this.props.isFocused + "" + this.props.side.isVisible);

    if (this.props.isFocused === true && this.props.side.isVisible === false)
      return true;
    
    this.props.setSide({
      isVisible : false
    });
    return false;
    /*
    if (this.state.isMain == true)
      return true;    
    return false;
    */
  }

  render() {

    return (

      <Container style = {styles.container}>
        
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

  onClickItem (id) {

    var survey = this.state.works.find(function(element) {
      return element.id == id;
    });

    RNProgressHud.showWithStatus("Please wait a moment");
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
              //this.props.navigation.push('Voting');
              
              this.props.navigation.navigate('Voting');
          } else if (responseJson.success == "already") {
            alert("You have already submitted");
          } else {
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
      setBrain : brain => { dispatch(setBrain(brain)) },
      setSide : side => {dispatch(setSide(side))},
  }
}

const mapStateToProps = state => {
  return { 
    side: state.side,  
    user: state.user,  
   };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(Main));
//export default connect(null, mapDispatchToProps)(Main)
