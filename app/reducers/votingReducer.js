import {
   SET_VOTING,
} from "../actions/actionTypes";

import {PROFILE_IMAGE_URL} from '../config';

const initialState = {   
   survey_id: null,
   template_id: null,
   question: [],
   /*
   question1: "",
   question1_op: [],
   question2: "",
   question3:"",
   question3_op: [], */
}

export default voting = (state = initialState , action = {}) => {
   switch (action.type) {
       case SET_VOTING :
           const { voting } = action;
           state = Object.assign({}, state, {
               survey_id: voting.survey_id,
               template_id: voting.template_id,
               title: voting.title,
               question: voting.question,
               /*
               question1: voting.question1,
               question1_op: voting.question1_op,
               question2: voting.question2,
               question3:voting.question3,
               question3_op: voting.question3_op */
           });
           return state;           
       default:
           return state;
   }
   
}