import axios from 'axios';

import APIConfig from '../config/api';

const quizAPIRoot = `${APIConfig.apiroot}/quiz`;
var namer = require('color-namer');

//Action Types
export const CHANGE_RECIPIENT_NAME = "perf/quiz/CHANGE_RECIPIENT_NAME";
export const CHANGE_RESULT_TITLE = "perf/quiz/CHANGE_RESULT_TITLE";
export const CHANGE_RELATIONS = "perf/quiz/CHANGE_RELATIONS";
export const CHANGE_SEXUALITY = "perf/quiz/CHANGE_SEXUALITY";
export const CHANGE_TAKER_NAME = "perf/quiz/CHANGE_TAKER_NAME";
export const CLEAR_ERROR_QUIZ = "perf/quiz/CLEAR_ERROR_QUIZ";
export const CLEAR_BASICINFO = "perf/quiz/CLEAR_BASICINFO";
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
export const START_OVER = 'perf/quiz/START_OVER';
export const TOGGLE_GIF = 'perf/quiz/TOGGLE_GIF';
export const TOGGLE_RESULT_TITLE = "perf/quiz/TOGGLE_RESULT_TITLE";


// CONST FOR REPRESENTING STATE OF QUIZ RESULT
export const QUIZ_RESULT_UNSTARTED = 'QUIZ_RESULT_UNSTARTED';
export const QUIZ_RESULT_LOADING = 'QUIZ_RESULT_LOADING';
export const QUIZ_RESULT_LOADED = 'QUIZ_RESULT_LOADED';

const INITIAL_STATE = {
    activeStep: 0,
    answers: [-1, -1, -1, -1, -1, -1, -1],
    error_message: "",
    quiz_name: "",
    quiz_id: 0,
    quiz_result_status: QUIZ_RESULT_UNSTARTED,
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
                "description": "",
                "img_lnk": "",
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
                      description: ["",""],
                      image_lnk: "https://i.pinimg.com/originals/05/4d/47/054d47a4e782a56bef5823d5ed186abc.jpg",
                      alias: "prim_alias"},
                  {name:"Innovator",
                      accord: "",
                      description: ["",""],
                      image_lnk: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/pharmaceutical-science/in-pharmatechnologist.com/article/2018/05/16/experts-warn-if-europe-doesn-t-innovate-it-will-lose-manufacturing-to-pharmerging-countries/8201005-1-eng-GB/Experts-warn-If-Europe-doesn-t-innovate-it-will-lose-manufacturing-to-pharmerging-countries_wrbm_large.jpg",
                      alias: "sec_alias"},
                  {name:"Architect",
                      accord: "",
                      description: ["",""],
                      image_lnk: "https://i.greatbigstory.com/uploads/story/keyframe_image/1809/web_Rock_Balancing_Site.jpg",
                      alias: "ter_alias"},
                  ],
    reveal_cards: [false, false, false],
    result_title: "",
    isDistilling: false,
    quizresult_id: -1,
    gifme: -1,
    editing: false,
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case CHANGE_RESULT_TITLE:
            return {
                ...state,
                result_title: action.payload,
            }
        case TOGGLE_RESULT_TITLE:
            return {
                ...state,
                editing: !state.editing,
            }
        case CLEAR_BASICINFO:
            return {
                ...state,
                recipient_relations: 0,
                taker_name: "",
                recipient_name: "",
                sexuality: "",
            }
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
            return {
                ...state,
                quiz_result_status: QUIZ_RESULT_LOADING
            }
        case LOAD_QUIZ_SUCCESS:
            if(action.payload) {
                return {
                    ...state,
                    quiz_id: action.payload.id,
                    error_message: "",
                    quiz_name: action.payload.quiz_name,
                    questions: action.payload.questions,
                    quiz_result_status: QUIZ_RESULT_LOADED,
                    editing: false,
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
        case CLEAR_ERROR_QUIZ:
            return {
                ...state,
                error_message: ""
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
            if(action.payload){
                var result_cards_list = [];
                result_cards_list.push(action.payload.card.primary);
                result_cards_list.push(action.payload.card.secondary);
                result_cards_list.push(action.payload.card.tertiary);
                result_cards_list[0].description = result_cards_list[0].description.split("/");
                result_cards_list[1].description = result_cards_list[1].description.split("/");
                result_cards_list[2].description = result_cards_list[2].description.split("/");
                return {
                    ...state,
                    error_message: "",
                    result_cards: result_cards_list,
                    quizresult_id: action.payload.quizresult_id,
                    result_title: namer(action.payload.collection_name).ntc[1].name,
                }
            } else {
                return {
                    ...state,
                }
            }

        case LOAD_RESULT_FAILURE:
            /*
            if the result load fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the result. We put a monkey on it so it should be solved in no time!",
            }
        case TOGGLE_GIF:
            return {
                ...state,
                gifme: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


//Action Creators
export const change_result_title = (value) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_RESULT_TITLE,
            payload: value,
        });
    };
};

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

export const load_result = (recipient_relations, quiz_id, answers) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_RESULT,
        });
        axios.post(`${quizAPIRoot}/result`, {
            "recipient_relations": recipient_relations,
            "quiz_id": quiz_id,
            "quiz_result":
                {
                    "q1": answers[0],
                    "q2": answers[1],
                    "q3": answers[2],
                    "q4": answers[3],
                    "q5": answers[4],
                    "q6": answers[5],
                    "q7": answers[6]
                }
        })
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

export const clear_error_quiz = (dispatch) => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_QUIZ
        })
    }
}

export const toggle_gif = (index) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_GIF,
            payload: index,
        })
    }
}

export const toggle_result_title = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_RESULT_TITLE,
        });
    };
};

export const clear_basicinfo = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_BASICINFO,
        })
    }
}
