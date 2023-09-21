const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  hosting: {
    //amount
    pet: {
      type: Boolean,
      required: true,
    },

    dog: {
      small: {
        is_hosted: Boolean,
        price: Number,
      },
      medium: {
        is_hosted: Boolean,
        price: Number,
      },
      big: {
        is_hosted: Boolean,
        price: Number,
      },
    },
    cat: {
      is_hosted: Boolean,
      price: Number,
    },
  },
  has_pet: {
    type: Boolean,
  },
  description: {
    type: String,
    minlength: 100,
    maxlength: 200,
    required: true,
  },
  check_in: {
    type: String,
    required: true,
  },
  check_out: {
    type: String,
    required: true,
  },
  amenities: {
    type: String,
    minlength: 100,
    maxlength: 200,
    required: true,
  },
  restrictions: {
    type: String,
    minlength: 100,
    maxlength: 200,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    external_number: {
      type: Number,
      required: true,
    },
    internal_number: {
      type: Number,
      required: true,
    },
    cologne: {
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
    postal_code: {
      type: Number,
      required: true,
    },
    streets_nearby: {
      type: String,
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
  },
  bank_account: {
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
});

module.exports = mongoose.model(
  "accommodation",
  accommodationSchema,
  "Accommodation"
);
