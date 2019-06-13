Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#eee',
  },
  question: {
    marginTop: 5,
    fontSize: 18,
    //color: '#0e0',
    textAlign: 'left',
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
  radioView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  picker: {
    width: deviceWidth - 60,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#000',
  },
  submitButton : {
    alignSelf: 'center',
    width: '90%',
    height: 40,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: 'rgb(48, 64, 89)',
    borderColor: 'rgb(56, 93, 138)',
  },
  questionInput: {
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },
  addAnswerButton: {
    height:35,
    padding: 7,
    marginLeft: 10,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  }
};
  