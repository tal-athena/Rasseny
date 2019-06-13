import {
   SET_NEW_SURVEY
} from "../actions/actionTypes";

import {PROFILE_IMAGE_URL} from '../config';

const initialState = {
   title: null,
   password: null,
   type: null,
   question: null,
   question_op:null,
   question_words: null,
   question1: null,
   question1_op: null,
   question2: null,
   question3: null,
   question3_op: null,
   question3_photo: null,   
}

export default survey = (state = initialState , action = {}) => {
   switch (action.type) {
       case SET_NEW_SURVEY :
           const { survey } = action;
           state = Object.assign({}, state, {
               title: survey.title,
               password: survey.password,
               type: survey.type,
               question: survey.question,
               question_op:survey.question_op,
               question_words: survey.question_words,
               question1: survey.question1,
               question1_op: survey.question1_op,
               question2: survey.question2,
               question3: survey.question3,
               question3_op: survey.question3_op,
               question3_photo: survey.question3_photo,               
           });
           return state;
       default:
           return state;
   }
}