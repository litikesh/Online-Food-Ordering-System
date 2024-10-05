const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Food Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Food Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Food Discounted Price"],
    maxLength: [8, "Price Cannot Exceed 8 Characters"],
  },
  actualPrice: {
    type: Number,
    required: [true, "Please Enter Food Actual Price"],
    maxLength: [8, "Price Cannot Exceed 8 Characters"],
  },
  Foodtype: {
    type: Number,
    required: [true, "Please Enter Food type veg or non-veg"],
  },
  tags: {
    type: Array,
    required: [true, "Please Enter Food tag"],
  },
  cal: {
    type: Number,
    required: [true, "please Enter calories"],
  },
  time: {
    type: Array,
    required: [true, "Please Enter times"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  category: {
    type: Array,
    required: [true, "Please Enter Food Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock Cannot Exceed 4 Characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      Username: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  extraOptions: {
    type: [
      {
        text: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
