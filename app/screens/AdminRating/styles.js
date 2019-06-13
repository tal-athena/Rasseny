Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#eee',
  },
  question: {
    fontSize: 18,
    //color: '#0e0',
    textAlign: 'left',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonGroupView: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  redButton: {
    backgroundColor: 'transparent',
    borderColor: '#c00',
    margin: 10,

  },
  greenButton: {
    backgroundColor: 'transparent',
    borderColor: '#0c0',
    margin: 10,
  },
  blueButton: {
    backgroundColor: 'transparent',
    borderColor: '#00c',
    margin: 10,
  },
  redButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#c00',
    margin: 10,

  },
  greenButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#0c0',
    margin: 10,
  },
  blueButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#00c',
    margin: 10,
  },
  submitButton : {
    alignSelf: 'center',
    width: '90%',
    height: 40,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
  },
  questionInput: {
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },
  addAnswerButton: {        
    height:35,
    width: 50,
    marginLeft: 10,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  }
};
  