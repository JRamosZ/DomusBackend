const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Reservation = require("../models/reservation.model");
const User = require("../models/user.model");
const { sendEmail } = require("./mailNotifications.usecase");

const paymentProcess = async (data) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(data.amount * 100),
    currency: "mxn",
    payment_method_types: ["card"],
    description: data.description,
    metadata: {
      reservationId: data.reservationId,
      clientId: data.clientId,
    },
  });

  const updatedReservation = await Reservation.findByIdAndUpdate(data.reservationId, { "cost.paymentId": paymentIntent.id }, { returnDocument: "after" });

  return paymentIntent;
};

const paymentStatus = async (event) => {
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const updatedReservation = await Reservation.findByIdAndUpdate(event.data.object.metadata.reservationId, { status: "paid" }, { returnDocument: "after" });
      const client = await User.findById(event.data.object.metadata.clientId);
      const host = await User.findById(event.data.object.metadata.hostId);
      const emails = await sendEmail(event.data.object.metadata.reservationId);
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;
      // email paid failed
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = { paymentProcess, paymentStatus };
