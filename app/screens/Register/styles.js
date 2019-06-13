

Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    container: {
        backgroundColor: 'rgb(48, 64, 89)'
    },
    logo : {
        resizeMode: 'center',
        alignSelf: 'center',
        height: deviceHeight / 4,
      },
      logoContainer: {
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',     
      },
    inputBox: {
        width: deviceWidth - 60,
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#999', 
        textAlign: 'left',
        color: '#fff',        
    },
    registerButtion : {
        alignSelf: 'center',
        width: deviceWidth - 60,
        height: 40,
        marginTop: 30,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: 'rgb(37, 64, 97)',
        borderColor: 'rgb(56, 93, 138)',
      }
}