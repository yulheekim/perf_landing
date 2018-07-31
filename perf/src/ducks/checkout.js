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
export const CLEAR_ERROR_CHECKOUT = 'perf/checkout/CLEAR_ERROR_CHECKOUT';
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
            const loEmail = ['nicholewalker0123@gmail.com', 'Carlosarodriguez@protonmail.com', 'Katrinasaw2@gmail.vom', 'ba.peterson1321@gmail.com', 'Anaescal625@gmail.com', 'Tolliverdani28@gmail.com', 'Tx.jeremiah@icloud.com', 'shellyfrias83@gmail.com', 'Messica.cornelius@gmail.com', 'davispaul60@outlook.com', 'bacq50@hotmail.com', 'Luzyanez@ymail.com', '29goddess29@gmail.com', 'Stitchedheart22@gmail.com', 'Miwia.lil.pup@gmail.com', 'Brittanytoth59@gmail.com', 'missjuliarules@gmail.com',
            'Krpresley@gmail.com', 'Hannah_hoj@icloud.com', 'sammi.brown38.sb@gmail.com', 'vickiharer6@gmail.com', 'donatovictoria@yahoo.com', 'Clarissamarina1995@gmail.com', 'brittanyejenks@gmail.com', 'Ladybughatley@fb.com', 'sierrahilyard@gmail.com', 'Cheyennejeremy@yahoo.com', 'Mrsschnell04@mac.com', 'lunarasolaris@gmail.com', 'Christina741carroll@gmail.com', 'michellegarcia4561@gmail.com', 'butterfly91ish@gmail.com', 'Vabluemice@hotmail.com', 'Jsause20@gmail.com',
            'jennawilsonjenna42@gmail.com', 'Paigefaith74@gmail.com', 'gaby93ramirez@gmail.com', 'Batbscards@gmail.com', 'Anitabepolished@gmail.com', '8268overyou@gmail.com', 'Ridukhan@hotmail.com', 'Lilpinkbunny@gmail.com', 'quinonescrystal0308@gmail.com', 'jingersnap2000@gmail.com', 'Sandraandandrew2017@gmail.com', 'Calienicole.booking@gmail.com', 'earlbridget1@gmail.com', 'teneshawiss755@gmail.com', 'dustinsbabygirl21@gmail.com', 'jrosado2012@gmail.com', 'jstjohn7@kent.edu',
            'Yamileth1265@hotmail.com', 'drgjuliee@yahoo.com', 'boasbeckey@gmail.com', 'Avierra933@gmail.com', 'CThomson8704@gmail.com', 'elisegatoo@gmail.com', 'urskar@rocketmail.com', 'humboldtcounty84@yahoo.com', 'fvwilson14@gmail.com', 'agomez.shamir@gmail.com', 'mion.michelle83@gmail.com', 'Kdking89@yahoo.com', 'kat_kris2001@yahoo.com', 'Noahtillinghast3419@gmail.com', 'palvarez850@gmail.com', 'chiquijuan1728@gmail.com', 'Rjbushard25@gmail.com', 'shanicekarim@gmail.com',
            'Brieannaward2014@gmail.com', 'gretamarsden02@gmail.com', 'Mariahalvarez246@gmail.com', 'Erinfaithmarcum@gmail.com', 'dpgood01@gmail.com', 'Karalynkeith33477@gmail.com', 'R3vytw0h4nds@gmail.com', 'Kelsey.condrey@gmail.com', 'elliotdodobird@gmail.com', 'Breanneneely@gmail.com', 'Breanneneely@ymail.com', 'ivytuet@hotmail.com', 'eresendiz702@gmail.com', 'Lisathorley@rocketmail.com', 'Colleen.quinn.814@gmail.com', 'kimberlybchristmas@yahoo.com', 'pianosrule@live.com',
            'genyajackson@yahoo.com', 'Smithkristin@hotmail.com', 'Evrybizy22@gmail.com', 'susiedetone2000@gmail.com', 'Sams_danielle88@yahoo.com', 'Alyccar@mail.regent.edu', 'Kassandraphinney@gmail.com', 'Amarakash@gmail.com', 'krutika.fender@gmail.com', 'Delilah1984@gmail.com', 'gayatrip36@gmail.com', 'Jessicamilwood@gmail.com', 'Nikkih4288@gmail.com', 'jessica.lizbette@gmail.com', 'spino.l@yahoo.com', 'rtillman0284@gmail.com', 'justiceclifton.jc@gmail.com',
            'grettelmelissa2001@gmail.com', 'meloangie2324@gmail.com', 'paigeprez25@icloud.com', 'michellefinch93@gmail.com', 'Abrooksb2007@gmail.com', 'amanda.marie.kingg65@gmail.com', 'lckimbrough@hotmail.com', 'Passaarti@gmail.com', 'mmgriswells@gmail.com', 'saraniallrivera@gmail.com', 'jackiemann2017@gmail.com', 'Perez423@msn.com', 'Tastycakes987@gmail.com', 'Tarynrox1@gmail.com', 'Krystyn62383@gmail.com', 'Glitterblondie84@aol.com', 'cuautle1127@gmail.com', 'Shobi.v5@gmail.com',
            'destiny_cheyenne@hotmail.com', 'Vcustode@yahoo.com', 'Afrothunder032@yahoo.com', 'emmaornelas17.eo@gmail.com', 'lisarush272@gmail.com', 'augustgsmith@gmail.com', 'Tessbernick@yahoo.com', 'xgalarza14@gmail.com', 'daniegreenlee@gmail.com', 'hooliha8154@gmail.com', 'itsemilybobby@yahoo.com', 'Savannateague1@gmail.com', 'Josievasquez1983@yahoo.com', 'Leslieu.1015@gmail.com', 'eddenck@gmail.com', 'Cydmarie.valentin@yahoo.com', 'Joanna.symon@yahoo.com',
            'Leilani.overlander@gmail.com', 'Ashp2023@gmail.com', 'Cheesecake287@gmail.com', 'nicolemcourtney@icloud.com', 'Margarettearuiz17@gmail.com', 'Gtsli469@gmail.com', 'Kiglesias72@hotmail.com', 'Kaylameg.ks@gmail.com', 'wildcheroke91@gmail.com', 'Polkcounty06@yahoo.com', 'Hannahe0209@gmail.com', 'bama_princess06@hotmail.com', 'sarahy200389@gmail.com', 'yoga.girl432@gmail.com', 'Sb82756@gmail.com', 'Nainaanand_patel@yahoo.com', 'marcelinalopez19@gmail.com',
            'Mdegrandchamp@marykay.com', 'Lillyowls@gmail.com', 'Chapinita_ivgv@hotmail.com', 'Mackenziemikula@gmail.com', 'Evangelinemihai@hotmail.com', 'annabelle.fisk@gmail.com', 'Emilybee4200@gmail.com', 'niesiaaa@wp.pl', 'lydamaehernandez@gmail.com', 'xwastelandxx@gmail.com', 'Shortyslilbit@yaho.com', 'Tawanda_86@yahoo.com', 'mrstiffanydavis4ever@gmail.com', 'lizzisully97@gmail.com', 'Seguinrds@icloud.com', 'Ranae.morrill@gmail.com', 'Cris4gla8@yahoo.com',
            'Cloudking2985@gmail.com', 'Evilmommabich@gmail.com', 'Clarissa.pala07062016@gmail.com', 'Mikikoishikawa11@gmail.com', 'Proudmom2one@hotmail.com', 'Kaelynslayton2018@yahoo.com', 'alyissa_gillman@yahoo.com', 'andreawoods1228@gmail.com', 'Kcrawley1130@gmail.com', 'Softballlover142@yahoo.com', 'disturbed10_1991@aol.com', 'Ivaber289413@gmail.com', 'Ashleytitatender1@gmail.com', 'akbarkhan3273@gmail.com', 'summeredmonds87@gmail.com', 'saharapixx@gmail.com',
            'Srbreadeseverino232009@gmail.com', 'Abbeyhawkins98@gmail.com', 'Peachysue3@gmail.com', 'Luzangelicaguillen@gmail.com', 'allisondonofrio94@aol.com', 'shawnee.v.garst19@gmail.com', 'Virginiacrooks@hotmail.com', 'marilynnvanriper@gmail.com', 'punkskeptic@gmail.com', 'natalie.kuchinski@gmail.com', 'lanetaylor20101213@gmail.com', 'Fangs6613@gmail.com', 'jackie12_46@yahoo.com'];
            var found = (loEmail.indexOf(state.promo) === -1 ? false : true);
            if (!found) {
                alert("Please check your promo code.")
            }
            return {
                ...state,
                found_email: found,
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
export const clear_error_checkout = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_CHECKOUT,
        })
    }
}
