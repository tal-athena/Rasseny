import {
   SET_SIDEMENU,   
} from "../actions/actionTypes";

import {PROFILE_IMAGE_URL} from '../config';

const initialState = {
   
   isVisible: false,

}

export default side = (state = initialState , action = {}) => {
   switch (action.type) {
       case SET_SIDEMENU :
           const { side } = action;
           state = Object.assign({}, state, {
               isVisible: side.isVisible,
           });
           return state;
      
       default:
           return state;
   }
   
}