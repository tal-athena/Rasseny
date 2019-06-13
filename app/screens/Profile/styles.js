import { BUTTON_TEXT_FONT_SIZE, BUTTON_BORDER_COLOR, BUTTON_BACK_COLOR, BUTTON_HEIGHT } from '../../config';


Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    container: {
        backgroundColor: 'rgb(48, 64, 89)',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    logoContainer: {           
        width: '100%',
        height:300,
        backgroundColor:'#ece',
        alignSelf:'center'         
    },
    logo : {        
        alignSelf: 'center',
        width: '100%',
        height: 300 ,        
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
        width: deviceWidth - 80,
        height: BUTTON_HEIGHT,
        marginTop: 10,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: BUTTON_BACK_COLOR,
        borderColor: BUTTON_BORDER_COLOR,
     },
     buttonTxt: {
        color:'#fff',
        fontSize: BUTTON_TEXT_FONT_SIZE
     }
}