Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: 'rgb(48, 64, 89)',
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
  }
};
  