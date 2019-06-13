import { BUTTON_HEIGHT, BUTTON_BACK_COLOR, BUTTON_BORDER_COLOR } from '../../config';

Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    //backgroundColor: 'rgb(48, 64, 89)',
    backgroundColor: '#eee',
  },
  item : {
    width: deviceWidth - 40,
    height: 200,
    backgroundColor: 'rgb(40, 48, 62)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginLeft:20,
    marginRight: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: 240,
    height: 190,    
  },
  topButton: {
    width: deviceWidth / 3,
    height: 40,
    backgroundColor: 'rgb(16, 115, 203)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateButton : {
    alignSelf: 'center',
    width: '80%',
    height: BUTTON_HEIGHT,
    marginTop: 40,
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: BUTTON_BACK_COLOR,
    borderColor: BUTTON_BORDER_COLOR,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
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
    marginLeft:10,
    marginTop: 20,
    marginBottom:20,
    //fontSize: 18,
  },
  passwordInput: {
    width: deviceWidth - 60,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
};
  