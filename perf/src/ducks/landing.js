
//Action Types
export const TOGGLE_MODAL= 'perf/landing/TOGGLE_MODAL';
export const UPDATE_SLIDER_DESC = 'perf/landing/UPDATE_SLIDER_DESC';

const INITIAL_STATE = {
    show_which: 0,
    why_descs: ['','Based on your response to our research-backed quiz, we identify raw materials and assemble them to discover a fragrance just for you.',
    'From the romantic blend of a blossoming peony to the exotic scent of sandalwood, feel the burst of nature with our fragrances. It’s all in our bottle.',
    'Your happiness is our #1 priority :) We love to talk about our product with you! Tell us your feedback, and we will get back to you!'],
    reviews: ['1','2','3','4','5','6','7'],
    currentSlider: 2,
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
