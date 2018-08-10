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
export const CHANGE_SHIPPING_NAME = 'perf/checkout/CHANGE_SHIPPING_NAME';
export const CHANGE_STATE = 'perf/checkout/CHANGE_STATE';
export const CHANGE_ZIPCODE = 'perf/checkout/CHANGE_ZIPCODE';
export const CHECK_PROMO = 'perf/checkout/CHECK_PROMO';
export const CHECK_PROMO_SUCCESS = 'perf/checkout/CHECK_PROMO_SUCCESS';
export const CHECK_PROMO_ERROR = 'perf/checkout/CHECK_PROMO_ERROR'; 
export const CHECKOUT_START = 'perf/checkout/CHECKOUT_START';
export const CLEAR_ERROR_CHECKOUT = 'perf/checkout/CLEAR_ERROR_CHECKOUT';
export const GO_CHECKOUT = 'perf/checkout/GO_CHECKOUT';
export const HANDLE_ORDER_ERROR = 'perf/checkout/HANDLE_ORDER_ERROR';
export const HANDLE_ORDER_RESPONSE = 'perf/checkout/HANDLE_ORDER_RESPONSE';
export const LOAD_BOTTLES = 'perf/checkout/LOAD_BOTTLES';
export const LOAD_BOTTLES_ERROR = 'perf/checkout/LOAD_BOTTLES_ERROR';
export const LOAD_BOTTLES_SUCCESS = 'perf/checkout/LOAD_BOTTLES_SUCCESS';
export const RESET_CHECKOUT = 'perf/checkout/RESET_CHECKOUT';
export const RESET_THANKYOU = 'perf/checkout/RESET_THANKYOU';
export const TOGGLE_MODAL = 'perf/checkout/TOGGLE_MODAL';

// CONST FOR REPRESENTING STATE OF QUIZ RESULT
export const CHECKOUT_LOADING = 'CHECKOUT_LOADING';
export const CHECKOUT_LOADED = 'CHECKOUT_LOADED';

function untiltwo(x) {
    return Number.parseFloat(x).toFixed(2);
}

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
    prices: [untiltwo(5), untiltwo(20), untiltwo(30)],
    shipping: [untiltwo(1.5), untiltwo(3), untiltwo(3)],
    open: false,
    email:"",
    shipping_name: "",
    address1:"",
    city:"",
    state_abbrv:"",
    zipcode:"",
    order_id: 0,
    promo:"",
    found_promo: false,
    checkout_status: "",
    product_price: 5.00,
    tax: 0.00,
    shipping_fee: 1.50,
    discount: 100,
    full_price: 6.50,
}


  

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_BOTTLE:
            var new_discount = state.discount;
            var new_found_promo = state.found_promo;
            if (action.payload === 0) {
                new_discount = 100;
                new_found_promo = false;
            }
            const new_product_price = untiltwo(state.prices[action.payload] * (new_discount * 0.01));
            const new_shipping_fee = state.shipping[action.payload];
            const new_tax = "0.00";
            const new_full_price = untiltwo(Number.parseFloat(new_product_price) + Number.parseFloat(new_tax) + Number.parseFloat(new_shipping_fee));
            return {
                ...state,
                current_bottle_index: action.payload,
                img_opt: 0,
                product_price: new_product_price,
                shipping_fee: new_shipping_fee,
                discount: new_discount,
                tax: new_tax,
                full_price: new_full_price,
                found_promo: new_found_promo
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
        case CHANGE_SHIPPING_NAME:
            return {
                ...state,
                shipping_name: action.payload,
            }
        case CHANGE_ZIPCODE:
            return {
                ...state,
                zipcode: action.payload,
            }
        case CHECKOUT_START:
            return {
                ...state,
                checkout_status: CHECKOUT_LOADING
            }
        case HANDLE_ORDER_RESPONSE:
            return {
                ...state,
                order_id: action.payload,
                error_message: "",
                checkout_status: CHECKOUT_LOADED
            }
        case HANDLE_ORDER_ERROR:
            return {
                ...state,
                error_message: action.payload,
                checkout_status: CHECKOUT_LOADED
            }
        case CHANGE_PROMO:
            return {
                ...state,
                promo: action.payload,
            }
        case CHECK_PROMO:
        case CHECK_PROMO_SUCCESS:
            if (action.payload) {
                var found = false;
                const approved_discount = parseInt(action.payload);
                if (approved_discount > 0) {
                    found = true;
                }
                const new_price = untiltwo(state.product_price * ((100 - approved_discount) * 0.01));
                const new_discount_tax = untiltwo(0);
                const new_full = untiltwo(new_price * 1.1 + state.shipping_fee + new_discount_tax);
                return {
                    ...state,
                    found_promo: found,
                    discount: 100 - approved_discount,
                    product_price: new_price,
                    tax: new_discount_tax,
                    full_price: new_full,
                }
            } else {
                return state;
            }
            
        case CHECK_PROMO_ERROR:
            alert("Error while checking for promo code. Please check again.")
            return {
                ...state,
            }
        case CLEAR_ERROR_CHECKOUT:
            return {
                ...state,
                error_message: "",
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
                    var images = [];
                    for (var j = 1; j <= action.payload.length; j++) {
                        images.push(item.images['image'+j])
                    }
                    loaded_bottle_images.push(images);
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
        case RESET_THANKYOU:
            return {
                ...state,
                order_id: 0,
                checkout_status: '',
            }
        case RESET_CHECKOUT:
            return {
                ...state,
                current_bottle_index: 0,
                img_opt: 0,
                email:"",
                address1:"",
                city:"",
                state_abbrv:"",
                zipcode:"",
                promo:"",
                open: false,
                found_promo: false,
                product_price: 5.00,
                tax: 0.00,
                shipping_fee: 1.50,
                discount: 100,
                full_price: 6.50,
            }
        default:
            return state
    }
}

// Action creator
export const load_bottles = () => {
    const url = APIConfig.apiroot + '/bottle';
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
export const change_shipping_name = (new_info) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SHIPPING_NAME,
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
export const check_promo = (promo_code) => {
    const url = APIConfig.apiroot + '/promo/check'
    return (dispatch) => {
        dispatch({
            type: CHECK_PROMO,
        })
        axios.post(url, {
            "promo_code": promo_code,
        })
          .then((response) => check_promo_success(dispatch, response))
          .catch((error) => check_promo_error(dispatch, error))
    };
}

export const check_promo_success = (dispatch, response) => {
    dispatch({
        type: CHECK_PROMO_SUCCESS,
        payload: response.data.discount
    });
}

export const check_promo_error = (dispatch, error) => {
    console.log(error);
    dispatch({
        type: CHECK_PROMO_ERROR,
    });
}

export const clear_error_checkout = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_CHECKOUT,
        })
    }
}

export const reset_thankyou = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_THANKYOU
        })
    }
}

export const reset_checkout = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_CHECKOUT
        })
    }
}

export const checkout_start = () => {
    return (dispatch) => {
        dispatch({
            type: CHECKOUT_START
        })
    }
}
