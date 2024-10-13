const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const { defaultUserImage } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is Required'],
      trim: true,
      maxlength: [31, 'Name cannot contain more than 31 characters'],
      minlength: [3, 'At least 3 characters required']
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [3, 'Enter a Valid Email.'],
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: `Please Enter a Valid Email.`
      }
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: [6, 'Password must be at least 6 characters'],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
      type: String,
      default: defaultUserImage
    },
    address: {
      type: String,
      required: [true, 'Address is Required']
    },
    phone: {
      type: String,
      required: [true, 'Phone is Required'],
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v);
        },
        message: `Please Enter a Valid Phone Number.`
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = model('User', userSchema);
module.exports = User;
