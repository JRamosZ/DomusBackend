const Reservation = require("../models/reservation.model")
var cron = require('node-cron');

const dayjs = require("dayjs")
dayjs().format()
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

// intervals added in data creation
const create = (data) => {
    data["evidence"] = []
    let initialDate = dayjs(data["start_date"])
    let finalDate = dayjs(data["finish_date"])
    while (initialDate.isSameOrBefore(finalDate)){
        data["evidence"].push({
            intervalDate: initialDate, 
            first: {url:'', time: null, status: 'pending'},
            second: {url:'', time: null, status: 'pending'},
            third: {url:'', time: null, status: 'pending'}
        })
        initialDate = initialDate.add(1, 'day');
}
    const reservation = Reservation.create(data)
    return reservation;
};

const list = async () => {
    const reservation = await Reservation.find();
    return reservation;
};

const getById = async (id) => {
    const reservation = await Reservation.findById(id);
    return reservation;
};

const modifyStatus = async (id, data) => {
    const reservation = await Reservation.findById(id);
    newStatus = data.status
    if (newStatus != "refused" && newStatus != "pending" && newStatus !=  "accepted" && newStatus != "paid" && newStatus != "current" && newStatus != "concluded"){
        const error = new Error("Status no valido");
        error.status = 400;
        throw error;
    }
    const updatedReservation = await Reservation.findByIdAndUpdate(reservation.id, {status: newStatus}, { returnDocument: "after"})
    return updatedReservation
}

const uploadEvidence = async (id, data) => {
    const reservation = await Reservation.findById(id);
    const currentDate = dayjs(data.time)
    reservation.evidence.forEach((interval, index) => {
        if(currentDate.format('MMMM D, YYYY') === dayjs(interval.intervalDate).format('MMMM D, YYYY') && currentDate.isBetween(currentDate.format("MMMM D, YYYY 05:00:00"), currentDate.format("MMMM D, YYYY 11:59:59")) && interval.first.url === ''){
            reservation["evidence"][index]["first"] = data
        } else if(currentDate.format('MMMM D, YYYY') === dayjs(interval.intervalDate).format('MMMM D, YYYY') && currentDate.isBetween(currentDate.format("MMMM D, YYYY 12:00:00"), currentDate.format("MMMM D, YYYY 17:59:59")) && interval.second.url === ''){
            reservation["evidence"][index]["second"] = data
        } else if(currentDate.format('MMMM D, YYYY') === dayjs(interval.intervalDate).format('MMMM D, YYYY') && currentDate.isBetween(currentDate.format("MMMM D, YYYY 18:00:00"), currentDate.format("MMMM D, YYYY 22:59:59")) && interval.third.url === ''){
            reservation["evidence"][index]["third"] = data
        }
    })
    const updatedReservation = await Reservation.findByIdAndUpdate(id, {evidence: reservation.evidence}, { returnDocument: "after"})
    return updatedReservation
}

// Reservation status automation (current, concluded) 
cron.schedule('0 5-23 * * *', async () => {
    const reservations = await Reservation.find();
    const currentDate = dayjs(new Date())
    reservations.filter(item => item.status === 'paid' && currentDate.isAfter(dayjs(item.start_date))).map(async reservation => {
        const updatedReservation = await Reservation.findByIdAndUpdate(reservation.id, {status: "current"}, { returnDocument: "after"})
        return updatedReservation
    })
    reservations.filter(item => item.status === 'current' && currentDate.isAfter(dayjs(item.finish_date))).map(async reservation => {
        const updatedReservation = await Reservation.findByIdAndUpdate(reservation.id, {status: "concluded"}, { returnDocument: "after"})
        return updatedReservation
    })
})

// Intervals evidence status automation (available, defaulted)
cron.schedule('0 5,12,18,23 * * *', async () => {
    const reservations = await Reservation.find();
    const currentDate = dayjs(new Date())

    reservations.filter(item => item.status === 'current').map(async reservation => {
        reservation.evidence.forEach( (item, index) => { 
            intervalConditionals("05:00:00", "11:59:59", item.first.url, "first")
            intervalConditionals("12:00:00", "17:59:59", item.second.url, "second")
            intervalConditionals("18:00:00", "22:59:59", item.third.url, "third")

            function intervalConditionals(time1, time2, url, interval ) {
                if(dayjs(item.intervalDate).format('MMMM D, YYYY') === currentDate.format('MMMM D, YYYY') && currentDate.isBetween(currentDate.format(`MMMM D, YYYY ${time1}`), currentDate.format(`MMMM D, YYYY ${time2}`)) && url === ''){
                    reservation["evidence"][index][interval]["status"] = "available"
                } else if (dayjs(item.intervalDate).format('MMMM D, YYYY') === currentDate.format('MMMM D, YYYY') && currentDate.isAfter(currentDate.format(`MMMM D, YYYY ${time2}`)) && url === '' ){
                    reservation["evidence"][index][interval]["status"] = "defaulted"
                }
            }

        })
        const updatedReservation = await Reservation.findByIdAndUpdate(reservation.id, {evidence: reservation.evidence}, { returnDocument: "after"})
        return updatedReservation
    })
});

module.exports = { create, list, getById, modifyStatus, uploadEvidence };