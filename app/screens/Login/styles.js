

Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import {SCREEN_BACK_GROUND, BUTTON_BACK_COLOR, BUTTON_BORDER_COLOR, BUTTON_HEIGHT, BUTTON_TEXT_FONT_SIZE} from '../../config';


export default {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: SCREEN_BACK_GROUND,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,      
        justifyContent:'flex-end',  
    },
    logo : {
        resizeMode: 'center',
        alignSelf: 'center',
        width: 200,
        height:200,        
      },
    logoContainer: {
        marginTop:50,
        position: 'relative',
        flex: 0.5,    
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
        //backgroundColor: 'rgb(56, 93, 138)',
        textAlign: 'left',
        color: '#fff',
    },
    loginButton : {
        alignSelf: 'center',
        width: deviceWidth - 60,
        height: BUTTON_HEIGHT,
        marginTop: 60,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: BUTTON_BACK_COLOR,
        borderColor: BUTTON_BORDER_COLOR,
      }
}