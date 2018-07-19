import axios from 'axios';

import APIConfig from '../config/api';

const quizAPIRoot = `${APIConfig.apiroot}/quiz`;

//Action Types
export const CHANGE_RECEPIENT_NAME = "perf/quiz/CHANGE_RECEPIENT_NAME";
export const CHANGE_RELATIONS = "perf/quiz/CHANGE_RELATIONS";
export const CHANGE_SEXUALITY = "perf/quiz/CHANGE_SEXUALITY";
export const CHANGE_TAKER_NAME = "perf/quiz/CHANGE_TAKER_NAME";
export const HANDLE_NEXT= 'perf/quiz/HANDLE_NEXT';
export const LOAD_QUIZ = "perf/quiz/LOAD_QUIZ";
export const LOAD_QUIZ_FAILURE = "perf/quiz/LOAD_QUIZ_FAILURE";
export const LOAD_QUIZ_SUCCESS = "perf/quiz/LOAD_QUIZ_SUCCESS";
export const REVEAL_CARD = "perf/quiz/REVEAL_CARD";
export const START_OVER= 'perf/quiz/START_OVER';

// The options are hardcoded for now but will be from the server as soon as server supports it,
// projected tobe wednesday
const INITIAL_STATE = {
    activeStep: 0,
    answers: [-1, -1, -1, -1, -1, -1, -1],
    error_message: "",
    quiz_name: "",
    recepient_options: ["you", "your friend", "your parent", "your sibling", "significant other"],
    recepient_relations: 0,
    taker_name: "",
    recepient_name: "",
    sexuality: "",
    sexuality_options: ["Masculine", "Somewhat Masculine", "Unisex", "Somewhat Feminine", "Feminine"],
    questions: [],
    result_cards: ["What is up bois", "This is Mark", "JUNG"],
    reveal_cards: [false, false, false],
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case HANDLE_NEXT:
            state.answers[state.activeStep] = action.payload;
            return {
                ...state,
                activeStep: state.activeStep + 1,
            }
        case START_OVER:
            return {
                ...state,
                activeStep: 0,
                answers: [-1, -1, -1, -1, -1, -1, -1],
            }
        case LOAD_QUIZ:
        case LOAD_QUIZ_SUCCESS:
            if(action.payload) {
                return {
                    ...state,
                    error_message: "",
                    quiz_name: action.payload.quiz_name,
                    questions: action.payload.questions,
                }
            }
            return {
                ...state,
                error_message: ""
            }

            
        case LOAD_QUIZ_FAILURE:
            /*
            if the quiz load fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the quiz. We put a monkey on it so it should be solved in no time!",
            }
        case CHANGE_RELATIONS:
            return {
                ...state,
                recepient_relations: action.payload
            }
        case CHANGE_RECEPIENT_NAME:
            return {
                ...state,
                recepient_name: action.payload
            }
        case CHANGE_TAKER_NAME:
            return {
                ...state,
                taker_name: action.payload
            }
        case CHANGE_SEXUALITY:
            return {
                ...state,
                sexuality: action.payload
            }
        case REVEAL_CARD:
            var new_reveal_cards = state.reveal_cards.slice()
            new_reveal_cards[action.payload] = true;
            return {
                ...state,
                reveal_cards: new_reveal_cards,
            }

        default:
            return {
                ...state
            }
    }
}

//Action Creators
export const handle_next = (opt_selected) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_NEXT,
            payload: opt_selected,
        })
    };
}
export const start_over = () => {
    return (dispatch) => {
        dispatch({
            type: START_OVER,
        })
    };
}
export const load_quiz = (whereto) => {
    const url = `${quizAPIRoot}/${whereto}`;
    return (dispatch) => {
        dispatch({
            type: LOAD_QUIZ
        });
        axios.get(url)
          .then((response) => load_quiz_success(dispatch, response))
          .catch((error) => load_quiz_failure(dispatch, error))
    }
}

export const load_quiz_success = (dispatch, response) => {
    dispatch({
        type: LOAD_QUIZ_SUCCESS,
        payload: response.data.response,
    });
}

export const load_quiz_failure = (dispatch, error) => {
    dispatch({
        type: LOAD_QUIZ_FAILURE,
    });
}

export const change_relations = (who) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_RELATIONS,
            payload: who
        });
    }
}

export const change_taker_name = (name) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TAKER_NAME,
            payload: name
        })
    }
}

export const change_recepient_name = (name) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_RECEPIENT_NAME,
            payload: name
        })
    }
}

export const change_sexuality = (value) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SEXUALITY,
            payload: value
        })
    }
}

export const reveal_card = (index) => {
    return (dispatch) => {
        dispatch({
            type: REVEAL_CARD,
            payload: index
        })
    }
} 
