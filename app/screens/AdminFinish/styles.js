Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#eee',
    flex:1,
    justifyContent: 'center',
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
  takePhoto : {
    alignSelf: 'center',
    width: '80%',
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
    marginRight: 15,
    
    marginBottom: 20,
  },
};
  