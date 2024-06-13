import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Apartment from "../models/Apartment";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userType: {
      type: String,
      required: false,
      enum: [
        "property_seeker",
        "Real_estate_agent",
        "Mortgage_broker",
        "Conveyancer",
        "private_seller",
        "guest",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(v);
        },
        message:
          "Password must contain at least one uppercase, one lowercase, one number and minimum 6 characters",
      },
    },
    Title: {
      type: String,
      enum: ["Miss", "Mr", "Mrs"],
    },
    FirstName: { type: String },
    MiddleName: { type: String },
    LastName: { type: String },
    Country: { type: String },
    city: { type: String },
    PostCode: { type: String },
    Address1: { type: String },
    Address2: { type: String },
    BusinessName: { type: String },
    CompanyName: { type: String },
    CompanyNumber: { type: String },
    PhoneNumber: { type: Number },
    MobileNumber: { type: Number },
    website: { type: String },

    img: {
      type: String,
    },
    // Apartment: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Apartment",
    //   },
    // ],
    newUser: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
userSchema.virtual("Apartments", {
  ref: "Apartments",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

userSchema.pre(/^find/, function () {
  this.populate("Apartments");
});

const User = mongoose.models?.Users || mongoose.model("Users", userSchema);
module.exports = User;
