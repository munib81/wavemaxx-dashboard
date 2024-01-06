import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isVerified: Boolean,
  createdAt: String,
  updatedAt: String,
  // invites: Array,
  plan: String,
  plan_status: String,
  payment_method: String,
  payment_id: String,
  payment_date: String,
  coupon_code: String,
  promoter_code: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || model("User", userSchema);

export default User;
