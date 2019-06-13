Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: 'rgb(48, 64, 89)',
    justifyContent: 'center',
    
  },
  item : {
    width: deviceWidth - 20,
    height: 200,
    backgroundColor: 'rgb(40, 48, 62)',
    flexDirection: 'row',    
    //alignItems: 'center',    
    marginLeft:10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent:'space-between'
  },
  itemImage: {
    width: 240,
    height: 190,    
  },
  topButton: {
    width: deviceWidth / 3,
    height: 40,
    backgroundColor: 'rgb(37, 64, 97)',
    borderColor: 'rgb(56, 93, 138)',
     alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: deviceWidth - 60,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    //backgroundColor: 'rgb(56, 93, 138)',
    textAlign: 'left',
    color: '#fff',
  },
  privateTextInput: {
    padding: 12,
    borderWidth: 1,
    //borderColor: '#ccc',
    borderRadius: 5,
    color: '#fff', 
    width: deviceWidth - 60,                                               
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
  
  modalContent: {
    backgroundColor: 'rgb(48, 64, 89)',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  addPrivateModalContent: {
    backgroundColor: 'rgb(48, 64, 89)',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }

};
  