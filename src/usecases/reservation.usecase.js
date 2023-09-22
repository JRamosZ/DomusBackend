const Reservation = require("../models/reservation.model")

const dayjs = require("dayjs")
dayjs().format()
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

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

module.exports = { create, list, getById };