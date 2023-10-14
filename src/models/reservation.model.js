const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    pet:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pets",
            required: true,
        }
    ],
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    host:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    status:{
        type: String,
        enum: ["refused", "pending", "accepted", "paid", "current", "concluded"],
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    finishDate:{
        type: Date,
        required: true
    },
    cost:{
        paymentId:{
            type: String
        },
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
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'comment',
        }
    ],
    reviews:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Reviews',
        }
    ]
})

module.exports = mongoose.model("Reservations", reservationSchema, "Reservations");