
//Action Types
export const TOGGLE_MODAL= 'perf/landing/TOGGLE_MODAL';
export const UPDATE_SLIDER_DESC = 'perf/landing/UPDATE_SLIDER_DESC';

const INITIAL_STATE = {
    show_which: 0,
    why_descs: ['','content for 0', 'content for 1', 'content for 2'],
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