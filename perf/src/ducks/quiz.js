import axios from 'axios';

import APIConfig from '../config/api';

const quizAPIRoot = `${APIConfig.apiroot}/quiz`;
const resultAPIRoot = `${APIConfig.apiroot}/result`;

//Action Types
export const CHANGE_RECIPIENT_NAME = "perf/quiz/CHANGE_RECIPIENT_NAME";
export const CHANGE_RELATIONS = "perf/quiz/CHANGE_RELATIONS";
export const CHANGE_SEXUALITY = "perf/quiz/CHANGE_SEXUALITY";
export const CHANGE_TAKER_NAME = "perf/quiz/CHANGE_TAKER_NAME";
export const HANDLE_NEXT= 'perf/quiz/HANDLE_NEXT';
export const HIDE_CARDS= 'perf/quiz/HIDE_CARDS';
export const LOAD_QUIZ = "perf/quiz/LOAD_QUIZ";
export const LOAD_QUIZ_FAILURE = "perf/quiz/LOAD_QUIZ_FAILURE";
export const LOAD_QUIZ_SUCCESS = "perf/quiz/LOAD_QUIZ_SUCCESS";
export const LOAD_RESULT = 'perf/quiz/LOAD_RESULT';
export const LOAD_RESULT_FAILURE = 'perf/quiz/LOAD_RESULT_FAILURE';
export const LOAD_RESULT_SUCCESS = 'perf/quiz/LOAD_RESULT_SUCCESS';
export const REVEAL_CARD = "perf/quiz/REVEAL_CARD";
export const START_DISTILLING = 'perf/quiz/START_DISTILLING';
export const START_OVER= 'perf/quiz/START_OVER';


// The options and results are hardcoded for now but will be from the server as soon as server supports them
const INITIAL_STATE = {
    activeStep: 0,
    answers: [-1, -1, -1, -1, -1, -1, -1],
    error_message: "",
    quiz_name: "",
    recipient_options: ["you", "your friend", "your parent", "your sibling", "significant other"],
    recipient_relations: 0,
    taker_name: "",
    recipient_name: "",
    sexuality: "",
    sexuality_options: ["Masculine", "Somewhat Masculine", "Unisex", "Somewhat Feminine", "Feminine"],
    questions: [{
        "id": 0,
        "question_text": "",
        "cards": [
            {
                "id": 29,
                "description": "window",
                "img_lnk": "https://s3-us-west-2.amazonaws.com/quiz.tryperf.com/dinner/q1/option1.png",
                "sexuality": 0,
                "personality": 0,
                "occasion": 2,
                "strength": 0,
                "primary": "",
                "secondary": "",
                "tertiary": ""
            }
        ]
    },],
    result_cards: [{name:"Navigator",
                      accord: "",
                      description: "this is a short description for Naviagator",
                      image_lnk: "http://www.bandt.com.au/information/uploads/2018/01/Compass-1260x840.png"},
                  {name:"Innovator",
                      accord: "",
                      description: "this is a short description for Innovator",
                      image_lnk: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/pharmaceutical-science/in-pharmatechnologist.com/article/2018/05/16/experts-warn-if-europe-doesn-t-innovate-it-will-lose-manufacturing-to-pharmerging-countries/8201005-1-eng-GB/Experts-warn-If-Europe-doesn-t-innovate-it-will-lose-manufacturing-to-pharmerging-countries_wrbm_large.jpg"},
                  {name:"Mediator",
                      accord: "",
                      description: "this is a short description for Mediator",
                      image_lnk: "https://i.amz.mshcdn.com/anNMhqPi83FtPO7tiOCrSrm1__4=/1200x627/2015%2F07%2F08%2F48%2Fthreedogsth.8e48d.jpg"},
                  ],
    reveal_cards: [false, false, false],
    result_title: "#22 Bergamot",
    isDistilling: false,
    amount: 10,
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case HANDLE_NEXT:
            state.answers[state.activeStep] = action.payload;
            console.log(state.answers);
            return {
                ...state,
                activeStep: state.activeStep + 1,
            }
        case START_OVER:
            return {
                ...state,
                activeStep: 0,
                answers: [-1, -1, -1, -1, -1, -1, -1],
                recipient_relations: 0,
                taker_name: "",
                recipient_name: "",
                sexuality: "",
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
                recipient_relations: action.payload
            }
        case CHANGE_RECIPIENT_NAME:
            return {
                ...state,
                recipient_name: action.payload
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
        case HIDE_CARDS:
            return {
                ...state,
                reveal_cards: [false, false, false],
                isDistilling: false,
            }
        case START_DISTILLING:
            return {
                ...state,
                isDistilling: !state.isDistilling,
            }
        case LOAD_RESULT:
        case LOAD_RESULT_SUCCESS:
            var result_cards_list = [];
            result_cards_list.push(action.payload.primary);
            result_cards_list.push(action.payload.secondary);
            result_cards_list.push(action.payload.tertiary);
            if(action.payload) {
                return {
                    ...state,
                    error_message: "",
                    result_cards: result_cards_list,
                    quiz_result_id: action.payload.quiz_result_id,
                }
            }
            return {
                ...state,
                error_message: ""
            }


        case LOAD_RESULT_FAILURE:
            /*
            if the result load fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the result. We put a monkey on it so it should be solved in no time!",
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

export const change_recipient_name = (name) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_RECIPIENT_NAME,
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

export const hide_cards = (index) => {
    return (dispatch) => {
        dispatch({
            type: HIDE_CARDS,
            payload: index
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

export const start_distilling = () => {
    return (dispatch) => {
        dispatch({
            type: START_DISTILLING,
        })
    }
}

export const load_result = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_RESULT
        });
        axios.get(`${resultAPIRoot}`)
          .then((response) => load_result_success(dispatch, response))
          .catch((error) => load_result_failure(dispatch, error))
    }
}

export const load_result_success = (dispatch, response) => {
    dispatch({
        type: LOAD_RESULT_SUCCESS,
        payload: response.data.response,
    });
}

export const load_result_failure = (dispatch, error) => {
    dispatch({
        type: LOAD_RESULT_FAILURE,
    });
}
