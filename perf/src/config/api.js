class APIConfig {
    static stripe_key = (process.env.stripe_key) ? process.env.stripe_key : "pk_test_gP3gqSSBvypkudXyIkjx8xpB";
    static apiroot = (process.env.stripe_key) ? "legitserverip" : "http://127.0.0.1:5000";
}

export default APIConfig;