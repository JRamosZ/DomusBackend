const Reservation = require("../models/reservation.model");
const { Resend } = require("resend");
const {
  newBookingClient,
  newBookingHost,
  cancelBookingClient,
  cancelBookingHost,
  acceptedBookingClient,
  acceptedBookingHost,
  paidBookingClient,
  paidBookingHost,
  concludedBookingClient,
  concludedBookingHost,
  currentBookingClient,
  currentBookingHost,
} = require("../../data/templates");

const RESEND_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_KEY);

const sendEmail = async (id) => {
  const data = await Reservation.findById(id).populate([
    "client",
    "host",
    "pet",
  ]);

  let clientEmail = null;
  let hostEmail = null;
  switch (data.status) {
    case "pending":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "Nueva reservación creada",
        html: newBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "Nueva reservación creada",
        html: newBookingHost(data),
      });
      break;

    case "accepted":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "Tu reservación ha sido aceptada",
        html: acceptedBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "La reservación ha sido aceptada",
        html: acceptedBookingHost(data),
      });
      break;

    case "refused":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "Tu reservación ha sido cancelada",
        html: cancelBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "La reservación ha sido cancelada",
        html: cancelBookingHost(data),
      });
      break;

    case "paid":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "Pago confirmado",
        html: paidBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "Pago confirmado",
        html: paidBookingHost(data),
      });
      break;

    case "concluded":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "La reservación ha concluido",
        html: concludedBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "La reservación ha concluido",
        html: concludedBookingHost(data),
      });
      break;

    case "current":
      clientEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.client.email],
        subject: "La reservación ha iniciado",
        html: currentBookingClient(data),
      });
      hostEmail = await resend.emails.send({
        from: "Domus <noreply@notifications.domus.com.mx>",
        to: [data.host.email],
        subject: "La reservación ha iniciado",
        html: currentBookingHost(data),
      });
      break;
  }
  return [clientEmail, hostEmail];
};

module.exports = { sendEmail };
