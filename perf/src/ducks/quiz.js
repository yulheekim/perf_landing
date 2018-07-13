import axios from 'axios';
import APIConfig from '../config/api';

const quizAPIRoot = `${APIConfig.apiroot}/quiz`;


//Action Types
export const LOAD_QUIZ = "perf/quiz/LOAD_QUIZ";
export const LOAD_QUIZ_SUCCESS = "perf/quiz/LOAD_QUIZ_SUCCESS"; 
export const LOAD_QUIZ_FAILURE = "perf/quiz/LOAD_QUIZ_FAILURE";

const INITIAL_STATE = {
    error_message: "",
    quiz_name: "",
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