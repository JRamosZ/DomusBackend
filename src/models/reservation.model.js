const mongoose = require("mongoose");
const Schema = require('mongoose').Schema;

const reservationSchema = new mongoose.Schema({
    pet:[
        {
            // type: Schema.Types.ObjectId,
            type: String,
            required: true
        }
    ],
    client:{
        type: String,
        required: true
    },
    host:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["refused", "pending", "accepted", "paid", "current", "concluded"],
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    finish_date:{
        type: Date,
        required: true
    },
    cost:{
        costPerNight: {
            type: Number
        },
        nights: {
            type: Number
        },
        taxes: {
            type: Number
        },
        domusFee: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    evidence:[{
            intervalDate: { 
                type: Date 
            },
            first: {
                url: { 
                    type: String 
                },
                time: { 
                    type: Date 
                },
                status: { 
                    type: String, 
                    enum: ["pending", "available", "defaulted", "success"] 
                }
            },
            second: {
                url: { 
                    type: String 
                },
                time: { 
                    type: Date 
                },
                status: { 
                    type: String, 
                    enum: ["pending", "available", "defaulted", "success"] 
                }
            },
            third: {
                url: { 
                    type: String 
                },
                time: { 
                    type: Date 
                },
                status: { 
                    type: String, 
                    enum: ["pending", "available", "defaulted", "success"] 
                }
            }
        }],
    comments:[
        {
            type: String
        }
    ],
    reviews:[
        {
            type: String
        }
    ]
})

module.exports = mongoose.model("Reservations", reservationSchema, "Reservations");