Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eee',
  },
  question: {
    fontSize: 16,
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
    padding:5,
  },
  greenButton: {
    backgroundColor: 'transparent',
    borderColor: '#0c0',
    margin: 10,
    padding: 5,
  },
  blueButton: {
    backgroundColor: 'transparent',
    borderColor: '#00c',
    margin: 10,
    padding: 5,
  },
  redButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#c00',
    margin: 10,
    padding: 5,
  },
  greenButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#0c0',
    margin: 10,
    padding: 5,
  },
  blueButton_selected: {
    backgroundColor: 'rgb(108, 176, 110)',
    borderColor: '#00c',
    margin: 10,
    padding: 5,
  },
  submitButton : {
    alignSelf: 'center',
    width: '90%',
    height: 40,
    marginTop: 30,    
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
}
};
  