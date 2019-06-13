import React from 'react';
import { TextInput, View, Text, Image} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import {connect} from 'react-redux'
import RNProgressHud from "react-native-progress-display";

import {
  Container,  
  Button,

} from "native-base";

var ImagePicker = require('react-native-image-picker');

import styles from './styles';
import {BASE_URL} from '../../config';


export class AdminFinish extends React.Component {


  constructor(props) {
    super(props);
    
    this.state = {
      itemTitle: "",
      itemImage: {},
    } 
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.survey !== this.props.survey) {
      this.setState({ itemTitle: "", itemImage: {},});
    }
  }
  componentWillMount() {

    this.setState({
        
      itemTitle : "",            
    });
  }
  render() {
    return (      
      <Container style = {styles.container}>        
        <TextInput 
            style = {styles.questionInput} 
            placeholder = "Please input title"
            value = {this.state.itemTitle}
            onChangeText = {(text) => this.setState({itemTitle: text})}
        />
                               
        <View style = {{width: 200, height:200, backgroundColor:'#ece', alignSelf:'center', justifyContent: 'center'}}>
          <Image 
            source = {{ uri:this.state.itemImage.uri}} 
            style = {{width: 200, height: 200, resizeMode: 'stretch'}}
          />
          {this.state.itemImage.uri == null && <Text style = {{position:'absolute', alignSelf:'center', top:90, flexWrap: 'wrap', fontSize: 16, justifyContent: 'center'}}>
            Please select image
          </Text>}
        </View>
        <Button 
          style = {styles.submitButton}
          onPress = {() => this.onLoadImage()}
          >
          <Text style = {{color: '#fff'}}>
            Update Image
          </Text>
        </Button>
        
        <Button style = {styles.submitButton} onPress = {() => this.onSubmit()}>
              <Text style = {{color: "#fff"}}>Submit</Text>
            </Button>
      </Container>    
    );
  }
  onLoadImage() {
    var options = {
      title: 'Select Image',     
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          itemImage: source,
        });
      }
    });
  }
  onSubmit() {

    if (this.state.itemTitle == "") {
      alert("Please input Title");
      return;
    }

    if (this.state.itemImage.uri == null) {
      alert("Please input Title");
      return;
    }
    
    RNProgressHud.showWithStatus("Please wait a moment");

    if (this.props.survey.type == 1) {

      RNFetchBlob.fetch('POST', BASE_URL + "/api/addvoting", {
        //Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'photo', filename: this.state.itemImage.fileName, data: this.state.itemImage.data },
            {
                name: 'info', data: JSON.stringify({
                    userId: this.props.user.userId,

                    question: this.props.survey.question,
                    password: this.props.survey.password,
                    title: this.state.itemTitle,                            
                })
            },
        ])
        .then((resp) => {
          
            //alert(resp.text());

            RNProgressHud.dismiss();

            responseJson = resp.json();
            if (responseJson.success == "success") {
              
              this.setState({
                itemTitle: "",
                itemImage:{},
              })
              alert("It has been successfully submitted");

              this.props.navigation.navigate('Main');
            } else {
              alert("Submit failed!\nPlease try again");
            } 
            // ...
        }).catch((err) => {
            // ...
            RNProgressHud.dismiss();
            alert("Network error" + err);
        })   
 
    } else if (this.props.survey.type == 2) {

      RNFetchBlob.fetch('POST', BASE_URL + "/api/addrating", {
        //Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'photo', filename: this.state.itemImage.fileName, data: this.state.itemImage.data },
            {
                name: 'info', data: JSON.stringify({
                  userId: this.props.user.userId,
                    question: this.props.survey.question,
                    question_words: this.props.survey.question_words,

                    password: this.props.survey.password,                    
                    title: this.state.itemTitle                          
                })
            },
        ])
        .then((resp) => {

            RNProgressHud.dismiss();
            responseJson = resp.json();
            if (responseJson.success == "success") {

              this.setState({
                itemTitle: "",
                itemImage:{},
              })
              alert("It has been successfully submitted");

              this.props.navigation.navigate('Main');

            } else {
                alert("Submit failed!\nPlease try again");
            } 
            // ...
        }).catch((err) => {
            // ...
            RNProgressHud.dismiss();
            alert("Network error" + err);
        })   

    } else if (this.props.survey.type == 3) {    

      RNFetchBlob.fetch('POST', BASE_URL + "/api/addbrain", {
        //Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'photo', filename: this.state.itemImage.fileName, data: this.state.itemImage.data },
            {
                name: 'info', data: JSON.stringify({
                  userId: this.props.user.userId,
                  question: this.props.survey.question,
                  question_op: this.props.survey.question_op,      
                  password: this.props.survey.password,                  
                  title: this.state.itemTitle                          
                })
            },
        ])        
        .then((resp) => {          

            RNProgressHud.dismiss();
            responseJson = resp.json();
            if (responseJson.success == "success") {

              this.setState({
                itemTitle: "",
                itemImage:{},
              })
              alert("It has been successfully submitted");

              this.props.navigation.navigate('Main');
                
            } else {
                alert("Submit failed!\nPlease try again");
            } 
            // ...
        }).catch((err) => {
            // ...
            RNProgressHud.dismiss();
            alert("Network error" + err);
        })   
    }
  }
}

const mapStateToProps = state => {
  return { 
    survey: state.survey,
    user: state.user,
   };
};

export default connect(mapStateToProps)(AdminFinish);