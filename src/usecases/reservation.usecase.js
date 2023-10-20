const Reservation = require("../models/reservation.model");
const User = require("../models/user.model");
var cron = require("node-cron");
const jwt = require("../lib/jwt.lib");

const dayjs = require("dayjs");
dayjs().format();
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

// intervals added in data creation
const create = async (data) => {
  const client = await User.findById(data.client);
  const host = await User.findById(data.host);
  if (!client || !host) {
    const error = new Error("Client or host not found");
    error.status = 404;
    throw error;
  }
  data["evidence"] = [];
  let initialDate = dayjs(data["startDate"]);
  let finalDate = dayjs(data["finishDate"]);
  while (initialDate.isSameOrBefore(finalDate)) {
    data["evidence"].push({
      intervalDate: initialDate,
      first: { url: "", time: null, status: "pending" },
      second: { url: "", time: null, status: "pending" },
      third: { url: "", time: null, status: "pending" },
    });
    initialDate = initialDate.add(1, "day");
  }
  const reservation = await Reservation.create(data);
  const updatedClient = await User.findByIdAndUpdate(
    reservation.client,
    { $push: { reservations: reservation.id } },
    { returnDocument: "after" }
  );
  const updatedHost = await User.findByIdAndUpdate(
    reservation.host,
    { $push: { reservations: reservation.id } },
    { returnDocument: "after" }
  );
  // Mail implementation to "Host user.email"
  return reservation;
};

const list = async () => {
  const reservation = await Reservation.find();
  return reservation;
};

const getById = async (id) => {
  const reservation = await Reservation.findById(id);
  // .populate(["client", "host", "reviews"])
  // .exec();
  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }
  return reservation;
};

// return reservation with all referenced data
const getAllById = async (id, query) => {
  let reservation;
  if (query.find === "info") {
    reservation = await Reservation.findById(id)
      .populate("pet")
      .populate("client", "-password")
      .populate({
        path: "host",
        select: "-password",
        populate: {
          path: "accommodation",
          select: "-bankAccount",
        },
      });
  } else if (query.find === "pet" || query.find === "evidence") {
    reservation = await Reservation.findById(id)
      .populate("pet")
      .populate("client", "-password");
  } else if (query.find === "comunication") {
    reservation = await Reservation.findById(id)
      .populate("host", "-password, -bankAccount")
      .populate("client", "-password")
      .populate("comments");
  } else if (query.find === "reviews") {
    reservation = await Reservation.findById(id)
      .populate("host", "-password, -bankAccount")
      .populate("client", "-password")
      .populate("pet")
      .populate({
        path: "reviews",
        populate: { path: "sender", select: ["name", "lastname", "picture"] },
      });
  } else {
    reservation = await Reservation.findById(id);
  }
  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }
  return reservation;
};

const modifyStatus = async (id, data, request) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }
  const authorization = request.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != reservation.host && reservation.client) {
    const error = new Error("you are not allowed to update the status");
    error.status = 403;
    throw error;
  }
  newStatus = data.status;
  if (
    newStatus != "refused" &&
    newStatus != "pending" &&
    newStatus != "accepted" &&
    newStatus != "paid" &&
    newStatus != "current" &&
    newStatus != "concluded"
  ) {
    const error = new Error("Status no valido");
    error.status = 400;
    throw error;
  }
  const updatedReservation = await Reservation.findByIdAndUpdate(
    reservation.id,
    { status: newStatus },
    { returnDocument: "after" }
  );
  if (!updatedReservation) {
    const error = new Error("Reservation not edited");
    error.status = 404;
    throw error;
  }
  if (newStatus === "refused") {
    // Mail implementation to "Client user.email"
    console.log("refused");
  } else if (newStatus === "accepted") {
    // Mail implementation to "Client user.email"
    console.log("accepted");
  }
  return updatedReservation;
};

const uploadEvidence = async (id, data, request) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }
  const authorization = request.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != reservation.host) {
    const error = new Error("you are not allowed to upload evidence");
    error.status = 403;
    throw error;
  }
  const currentDate = dayjs(data.time);
  reservation.evidence.forEach((interval, index) => {
    if (
      currentDate.format("MMMM D, YYYY") ===
        dayjs(interval.intervalDate).format("MMMM D, YYYY") &&
      currentDate.isBetween(
        currentDate.format("MMMM D, YYYY 05:00:00"),
        currentDate.format("MMMM D, YYYY 11:59:59")
      ) &&
      interval.first.url === ""
    ) {
      reservation["evidence"][index]["first"] = data;
    } else if (
      currentDate.format("MMMM D, YYYY") ===
        dayjs(interval.intervalDate).format("MMMM D, YYYY") &&
      currentDate.isBetween(
        currentDate.format("MMMM D, YYYY 12:00:00"),
        currentDate.format("MMMM D, YYYY 17:59:59")
      ) &&
      interval.second.url === ""
    ) {
      reservation["evidence"][index]["second"] = data;
    } else if (
      currentDate.format("MMMM D, YYYY") ===
        dayjs(interval.intervalDate).format("MMMM D, YYYY") &&
      currentDate.isBetween(
        currentDate.format("MMMM D, YYYY 18:00:00"),
        currentDate.format("MMMM D, YYYY 22:59:59")
      ) &&
      interval.third.url === ""
    ) {
      reservation["evidence"][index]["third"] = data;
    }
  });
  const updatedReservation = await Reservation.findByIdAndUpdate(
    id,
    { evidence: reservation.evidence },
    { returnDocument: "after" }
  );
  if (!updatedReservation) {
    const error = new Error("Reservation not edited");
    error.status = 404;
    throw error;
  }
  return updatedReservation;
};

// Reservation status automation (current, concluded)
cron.schedule("0 5-23 * * *", async () => {
  const reservations = await Reservation.find({
    $or: [{ status: "paid" }, { status: "current" }],
  });
  const currentDate = dayjs(new Date());
  reservations
    .filter(
      (item) =>
        item.status === "paid" && currentDate.isAfter(dayjs(item.startDate))
    )
    .map(async (reservation) => {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        reservation.id,
        { status: "current" },
        { returnDocument: "after" }
      );
      return updatedReservation;
    });
  reservations
    .filter(
      (item) =>
        item.status === "current" && currentDate.isAfter(dayjs(item.finishDate))
    )
    .map(async (reservation) => {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        reservation.id,
        { status: "concluded" },
        { returnDocument: "after" }
      );
      return updatedReservation;
    });
});

// Intervals evidence status automation (available, defaulted)
cron.schedule("0 5,12,18,23 * * *", async () => {
  const reservations = await Reservation.find({ status: "current" });
  const currentDate = dayjs(new Date());

  reservations.map(async (reservation) => {
    reservation.evidence.forEach((item, index) => {
      intervalConditionals("05:00:00", "11:59:59", item.first.url, "first");
      intervalConditionals("12:00:00", "17:59:59", item.second.url, "second");
      intervalConditionals("18:00:00", "22:59:59", item.third.url, "third");

      function intervalConditionals(time1, time2, url, interval) {
        if (
          dayjs(item.intervalDate).format("MMMM D, YYYY") ===
            currentDate.format("MMMM D, YYYY") &&
          currentDate.isBetween(
            currentDate.format(`MMMM D, YYYY ${time1}`),
            currentDate.format(`MMMM D, YYYY ${time2}`)
          ) &&
          url === ""
        ) {
          reservation["evidence"][index][interval]["status"] = "available";
        } else if (
          dayjs(item.intervalDate).format("MMMM D, YYYY") ===
            currentDate.format("MMMM D, YYYY") &&
          currentDate.isAfter(currentDate.format(`MMMM D, YYYY ${time2}`)) &&
          url === ""
        ) {
          reservation["evidence"][index][interval]["status"] = "defaulted";
        }
      }
    });
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservation.id,
      { evidence: reservation.evidence },
      { returnDocument: "after" }
    );
    return updatedReservation;
  });
});

module.exports = {
  create,
  list,
  getById,
  getAllById,
  modifyStatus,
  uploadEvidence,
};
