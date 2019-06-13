import {
   SET_BRAIN,
} from "../actions/actionTypes";

const initialState = {   
   survey_id: null,
   template_id: null,
   question: "",
   question_op1: [],   
   question_op2: [],   
}

export default brain = (state = initialState , action = {}) => {
   switch (action.type) {
       case SET_BRAIN :
           const { brain } = action;
           state = Object.assign({}, state, {
                survey_id: brain.survey_id,
                template_id: brain.template_id,
                title: brain.title,
                question: brain.question,
                question_op1: brain.question_op.slice(0, 5),
                question_op2: brain.question_op.slice(5),
          });
          return state;                      
       default:
           return state;
   }
   
}