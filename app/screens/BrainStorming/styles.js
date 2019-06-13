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
    marginTop: 5,
    fontSize: 16,
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
}
};
  