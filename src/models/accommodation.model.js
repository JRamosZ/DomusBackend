const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  picture: {
    type: [String],
    required: true,
  },
  hosting: {
    amount: {
      type: Number,
    },
    dog: {
      small: {
        isHosted: Boolean,
        price: Number,
      },
      medium: {
        isHosted: Boolean,
        price: Number,
      },
      big: {
        isHosted: Boolean,
        price: Number,
      },
    },
    cat: {
      isHosted: Boolean,
      price: Number,
    },
  },
  hasPet: {
    type: Boolean,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 200,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  amenities: {
    type: String,
    minlength: 10,
    maxlength: 200,
    required: true,
  },
  restrictions: {
    type: String,
    minlength: 10,
    maxlength: 200,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    externalNumber: {
      type: Number,
      required: true,
    },
    internalNumber: {
      type: Number,
      required: true,
    },
    neighbourhood: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    streetsNearby: {
      type: String,
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
  },
  bankAccount: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    clabe: {
      type: String,
      required: true,
    },
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 5,
  },
  ratesList: {
    type: [Number],
    validate: {
      validator: function (v) {
        for (num of v) {
          if (num <= 5 && num >= 0) {
            continue;
          } else {
            return false;
          }
        }
      },
      message: "Rate most be between 0 and 5",
    },
  },
});

module.exports = mongoose.model(
  "accommodation",
  accommodationSchema,
  "Accommodation"
);
