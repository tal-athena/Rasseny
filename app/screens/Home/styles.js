
Dimensions = require('Dimensions');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import {SCREEN_BACK_GROUND, BUTTON_BACK_COLOR, BUTTON_BORDER_COLOR, BUTTON_HEIGHT, BUTTON_TEXT_FONT_SIZE} from '../../config';

export default {
    logo : {
      resizeMode: 'center',
      alignSelf: 'center',
      height: deviceHeight / 4,
    },
    logoContainer: {
      marginTop: deviceHeight / 8,
      marginBottom: deviceHeight / 10,    
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',     
    },
    container: {
      padding: 10,
      paddingBottom: 30,
      flex: 1,
      flexDirection: 'column',          
      backgroundColor: SCREEN_BACK_GROUND,
      justifyContent: 'space-between',
 
    },
    socialButton : {
      height: BUTTON_HEIGHT,
      width:  deviceWidth - 80,
      marginTop: 10,
      marginLeft: 40,
      marginRight: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center', 
    }, 
    loginButton : {    
      height: BUTTON_HEIGHT,
      width: deviceWidth / 2 - 20 ,
      marginLeft:5,
      marginRight:5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      backgroundColor: BUTTON_BACK_COLOR,
      borderColor: BUTTON_BORDER_COLOR,
      borderRadius: 4
    },
    createButton : {    
      height: BUTTON_HEIGHT,
      width: deviceWidth / 2 - 20 ,
      marginLeft:5,
      marginRight:5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      backgroundColor: BUTTON_BACK_COLOR,
      borderColor: BUTTON_BORDER_COLOR,
      borderRadius: 4
    },
    loginText: {
      color: '#fff',
      fontSize: BUTTON_TEXT_FONT_SIZE,
    }
  };
  