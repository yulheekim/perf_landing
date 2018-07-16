import axios from 'axios';
import APIConfig from '../config/api';

const quizAPIRoot = `${APIConfig.apiroot}/quiz`;


//Action Types
export const LOAD_QUIZ = "perf/quiz/LOAD_QUIZ";
export const LOAD_QUIZ_SUCCESS = "perf/quiz/LOAD_QUIZ_SUCCESS"; 
export const LOAD_QUIZ_FAILURE = "perf/quiz/LOAD_QUIZ_FAILURE";
export const CHANGE_RELATIONS = "perf/quiz/CHANGE_RELATIONS";
export const CHANGE_TAKER_NAME = "perf/quiz/CHANGE_TAKER_NAME";
export const CHANGE_RECEPIENT_NAME = "perf/quiz/CHANGE_RECEPIENT_NAME";
export const CHANGE_SEXUALITY = "perf/quiz/CHANGE_SEXUALITY";

// The options are hardcoded for now but will be from the server as soon as server supports it,
// projected tobe wednesday
const INITIAL_STATE = {
    error_message: "",
    quiz_name: "",
    recepient_options: ["you", "your friend", "your parent", "your sibling", "significant other"],
    recepient_relations: 0,
    taker_name: "",
    recepient_name: "",
    sexuality: "",
    sexuality_options: ["Masculine", "Somewhat Masculine", "Unisex", "Somewhat Feminine", "Feminine"],
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case LOAD_QUIZ:
        case LOAD_QUIZ_SUCCESS:
            /*
            need to load the questions from the server
            */
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

        default:
            return {
                ...state
            }
    }
};

//Action Creators
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
        payload: response.data.response
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