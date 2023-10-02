const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Reservation = require("../models/reservation.model")

const paymentProcess = async (data) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount * 100,
        currency: 'mxn',
        payment_method_types: ["card"],
        description: data.description,
        metadata: {
            reservationId: data.reservationId,
        },
    });

    const updatedReservation = await Reservation.findByIdAndUpdate(data.reservationId, { 'cost.paymentId': paymentIntent.id }, {returnDocument: "after"})

    return paymentIntent
};

const paymentStatus = async (event) => {
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const updatedReservation = await Reservation.findByIdAndUpdate(
                event.data.object.metadata.reservationId, { status: 'paid' }, {returnDocument: "after"}
            )
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
};

module.exports = { paymentProcess, paymentStatus }