const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentProcess = async (data) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount * 100,
        currency: 'mxn',
        description: data.description,
    });

    return paymentIntent
};

module.exports = { paymentProcess }