import axios from 'axios';

import APIConfig from '../config/api';

//Action Types
export const CHANGE_ADDRESS1 = 'perf/checkout/CHANGE_ADDRESS1';
export const CHANGE_BOTTLE = 'perf/checkout/CHANGE_BOTTLE';
export const CHANGE_CITY = 'perf/checkout/CHANGE_CITY';
export const CHANGE_EMAIL = 'perf/checkout/CHANGE_EMAIL';
export const CHANGE_IMAGE = 'perf/checkout/CHANGE_IMAGE';
export const CHANGE_MESSAGE = 'perf/checkout/CHANGE_MESSAGE';
export const CHANGE_PROMO = 'perf/checkout/CHANGE_PROMO';
export const CHANGE_STATE = 'perf/checkout/CHANGE_STATE';
export const CHANGE_ZIPCODE = 'perf/checkout/CHANGE_ZIPCODE';
export const CHECK_PROMO = 'perf/checkout/CHECK_PROMO';
export const GO_CHECKOUT = 'perf/checkout/GO_CHECKOUT';
export const HANDLE_ORDER_ERROR = 'perf/checkout/HANDLE_ORDER_ERROR';
export const HANDLE_ORDER_RESPONSE = 'perf/checkout/HANDLE_ORDER_RESPONSE';
export const LOAD_BOTTLES = 'perf/checkout/LOAD_BOTTLES';
export const LOAD_BOTTLES_ERROR = 'perf/checkout/LOAD_BOTTLES_ERROR'; 
export const LOAD_BOTTLES_SUCCESS = 'perf/checkout/LOAD_BOTTLES_SUCCESS';
export const TOGGLE_MODAL = 'perf/checkout/TOGGLE_MODAL';


const INITIAL_STATE = {
    error_message: "",
    message: "",
    bottle_imgs: [['sample_card_img0', 'sample_card_img1', 'sample_card_img2'],
                  ['10mL_roll_on_img0', '10mL_roll_on_img1', '10mL_roll_on_img2'],
                  ['15mL_spray_img0', '15mL_spray_img1', '15mL_spray_img2']],
    current_bottle_index: 0,
    img_opt: 0,
    bottle_types: ['2mL Spray Sample', '10mL Roll On', '15mL Spray'],
    amounts: [2, 10, 15],
    types: ['spray', 'roll on', 'spray'],
    prices: [5, 15, 25],
    open: false,
    email:"",
    address1:"",
    city:"",
    state_abbrv:"",
    zipcode:"",
    order_id: 0,
    promo:"",
    found_email: false,
}


//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_BOTTLE:
            return {
                ...state,
                current_bottle_index: action.payload,
                img_opt: 0,
            }
        case CHANGE_IMAGE:
            return {
                ...state,
                img_opt: action.payload,
            }
        case CHANGE_MESSAGE:
            return {
                ...state,
                message: action.payload,
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                open: !state.open,
            }
        case CHANGE_ADDRESS1:
            return {
                ...state,
                address1: action.payload,
            }
        case CHANGE_CITY:
            return {
                ...state,
                city: action.payload,
            }
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload,
            }
        case CHANGE_STATE:
            return {
                ...state,
                state_abbrv: action.payload,
            }
        case CHANGE_ZIPCODE:
            return {
                ...state,
                zipcode: action.payload,
            }
        case HANDLE_ORDER_RESPONSE:
            return {
                ...state,
                order_id: action.payload,
                error_message: "",
            }
        case HANDLE_ORDER_ERROR:
            return {
                ...state,
                error_message: action.payload,
            }
        case CHANGE_PROMO:
            return {
                ...state,
                promo: action.payload,
            }
        case CHECK_PROMO:
            const loEmail = ["moco","ceold","aeng"]; // update this to the actual list
            var found = (loEmail.indexOf(state.promo) === -1 ? false : true);
            if (!found) {
                alert("Please check your promo code.")
            }
            return {
                ...state,
                found_email: found,
            }
        case LOAD_BOTTLES:
        case LOAD_BOTTLES_SUCCESS:
            if(action.payload) {
                var loaded_bottle_images = [];
                var loaded_bottle_types = [];
                var loaded_prices = [];
                var loaded_sizes = [];
                var loaded_types = [];
                for (var i = 0; i < action.payload.length; i++) {
                    const item = action.payload[i];
                    loaded_bottle_images.push(item.images);
                    loaded_bottle_types.push(item.volume + ' mL ' + item.type);
                    loaded_prices.push(item.price);
                    loaded_sizes.push(item.volume);
                    loaded_types.push(item.type);
                }
                return {
                    ...state,
                    bottle_imgs: loaded_bottle_images,
                    prices: loaded_prices,
                    bottle_types: loaded_bottle_types,
                    amounts: loaded_sizes,
                    types: loaded_types,
                }
            }
            else {
                return {
                ...state,
                }
            }
        case LOAD_BOTTLES_ERROR:
            return {
                ...state,
                error_message: "Error loading bottle options"
            }
        default:
            return state
    }
}

// Action creator
export const load_bottles = () => {
    const url = APIConfig.apiroot + '/bottle'
    return (dispatch) => {
        dispatch({
            type: LOAD_BOTTLES
        });
        axios.get(url)
          .then((response) => load_bottles_success(dispatch, response))
          .catch((error) => load_bottles_error(dispatch, error))
    };
};

export const load_bottles_success = (dispatch, response) => {
    dispatch({
        type: LOAD_BOTTLES_SUCCESS,
        payload: response.data.response
    });
};

export const load_bottles_error = (dispatch, error) => {
    dispatch({
        type: LOAD_BOTTLES_ERROR,
    });
};

export const change_bottle = (id) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_BOTTLE,
            payload: id,
        })
    };
}
export const change_image = (id) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_IMAGE,
            payload: id,
        })
    };
}

export const change_message = (msg) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_MESSAGE,
            payload: msg
        })
    };
}

export const toggle_modal = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
        })
    }
}

export const change_email = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_EMAIL,
            payload: new_info,
        })
    }
}
export const change_address1 = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ADDRESS1,
            payload: new_info,
        })
    }
}
export const change_city = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_CITY,
            payload: new_info,
        })
    }
}
export const change_state = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_STATE,
            payload: new_info,
        })
    }
}
export const change_zipcode = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ZIPCODE,
            payload: new_info,
        })
    }
}
export const handle_order_response = (order_id) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_ORDER_RESPONSE,
            payload: order_id,
        })
    }
}
export const handle_order_error = (error_message) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_ORDER_ERROR,
            payload: error_message
        })
    }
}
export const change_promo = (promo) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_PROMO,
            payload: promo
        })
    };
}
export const check_promo = () => {
    return (dispatch) => {
        dispatch({
            type: CHECK_PROMO,
        })
    };
}
