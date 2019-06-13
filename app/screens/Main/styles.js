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
    backgroundColor: 'rgb(16, 115, 203)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    //borderColor: 'rgb(248, 250, 252)',
    backgroundColor: 'rgb(231, 235, 241)',
    fontSize:20,
    textAlign: 'center',
  }
};
  