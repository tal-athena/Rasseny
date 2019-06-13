Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#eee',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    //color: '#0e0',
    textAlign: 'left',
    marginBottom:5,
  },
  questionSection: {
    marginTop: 20,
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
    height: 40,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
}
};
  