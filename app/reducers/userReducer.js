import {
    SET_USER,
    SET_USER_PHOTO
} from "../actions/actionTypes";

import {PROFILE_IMAGE_URL} from '../config';

const initialState = {
    userId : null,
    userName : null,    
    email: null,
    apiToken : null,
    photo:null,

}

export default user = (state = initialState , action = {}) => {
    switch (action.type) {
        case SET_USER :
            const { user } = action;
            state = Object.assign({}, state, {
                userId: user.userId,
                userName : user.userName,                
                email: user.email,
                photo: PROFILE_IMAGE_URL + user.photo,
                apiToken: user.apiToken
            });
            return state;
        case SET_USER_PHOTO:           
            return {                
                photo: PROFILE_IMAGE_URL + action.user.photo,                
            }
            break;
        default:
            return state;
    }
    
}