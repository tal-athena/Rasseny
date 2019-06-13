import {
   SET_RATING,
} from "../actions/actionTypes";

const initialState = {   
   survey_id: null,
   template_id: null,
   question: "",
   question_words: [],   
}

export default rating = (state = initialState , action = {}) => {
   switch (action.type) {
       case SET_RATING :
           const { rating } = action;
           state = Object.assign({}, state, {
               survey_id: rating.survey_id,
               template_id: rating.template_id,
               title: rating.title,
               question: rating.question,
               question_words: rating.question_words,
               
           });
           return state;           
       default:
           return state;
   }
   
}