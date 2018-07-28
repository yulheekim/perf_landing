class APIConfig {
    static stripe_key = (process.env.stripe_key) ? "pk_live_puMGBbuzWfMB2GrvKgy7S4LH" : "pk_test_gP3gqSSBvypkudXyIkjx8xpB";
    static apiroot = (process.env.stripe_key) ? "https://api.yourperf.com" : "http://127.0.0.1:5000";
    static gift_msg_char_limit = 120;
}

export default APIConfig;
