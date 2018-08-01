
//Action Types
export const TOGGLE_MODAL= 'perf/landing/TOGGLE_MODAL';
export const UPDATE_SLIDER_DESC = 'perf/landing/UPDATE_SLIDER_DESC';

const INITIAL_STATE = {
    show_which: 0,
    why_descs: ['','Based on your response to our research-backed quiz, we identify raw materials and assemble them to discover a fragrance just for you.',
    'From the romantic blend of a blossoming peony to the exotic scent of sandalwood, it’s all in our bottle.',
    'Your happiness is our top priority :) We love to talk about our product with you!'],
    reviews: 
    ["\"I used to spend obscene amount of time trying different perfumes and figuring out the right one but with Perf, the girl is no longer - feels like Perf already knows what I want!\"", 
     "\"I don’t usually wear perfume because I don’t often like the scents, but I loved this one! It was easier to just get one option catered to me rather than choose from a ton in the store.\"" ,
     "\"It was so much fun to receive the sample and made me much more confident in purchasing the larger size!\"",
     "\"No need to come up with \“this is for my boyfriend\” excuse when purchasing rather masculine fragrance. This is great!\""],
    currentSlider: 1,
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case TOGGLE_MODAL:
            return {
                ...state,
                show_which: action.payload,
            };
        case UPDATE_SLIDER_DESC:
            return {
                ...state,
                currentSlider: action.payload
            };
        default:
            return {
                ...state
            }
    }
}

//Action Creators
export const toggle_modal = (id) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
            payload: id
        })
    };
}

export const update_slider_desc = (index) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SLIDER_DESC,
            payload: index
        })
    }
}
