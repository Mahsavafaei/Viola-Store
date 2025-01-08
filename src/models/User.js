import { Schema, model, models, now } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  // فعال یا غیرفعال بودن وضعیت کاربر=>
  enabled: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "",
  },
  //    created history of this item =>
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    // the date cannot changed
  },
});

const User = models.User || model("User", userSchema);

export default User;

// مدل منجر به ساخت ایتمم در کالکشن یا همان تیبل میشود
