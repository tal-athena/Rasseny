import { BUTTON_HEIGHT, BUTTON_BACK_COLOR, BUTTON_BORDER_COLOR } from '../../config';

Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#eee',
  },
  question: {
    fontSize: 20,
    //color: '#0e0',    
    marginLeft:10,
    width: 20,      
  },
  radioView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  radioText: {
    marginLeft: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  
  picker: {
    width: deviceWidth - 60,
    borderWidth: 2,
    borderStyle: 'solid',    
  },
  submitButton : {
    alignSelf: 'center',
    width: '90%',
    height: BUTTON_HEIGHT,
    marginTop: 20,
    marginBottom: 8,
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: BUTTON_BACK_COLOR,
    borderColor: BUTTON_BORDER_COLOR,
  },
  questionInput: {
    borderBottomWidth: 1,    
    width: deviceWidth - 50,
  },
  questionInput2: {
    borderBottomWidth: 1,    
    marginLeft: 15,
    marginRight: 15,    
  },
  addAnswerButton: {
    height:35,    
    width:100,
    marginLeft: 10,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgb(48, 64, 89)',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  loginButton : {
    alignSelf: 'center',
    width: deviceWidth - 60,
    height: 40,    
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
    marginTop: 25,
  },
};
  