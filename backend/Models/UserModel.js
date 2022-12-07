import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";

const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
User.statics.signup = async function (username, password) {
  //validasi
  if (!username || !password) {
    throw Error("All fields must be filled!");
  }
  //jika password tidak strong, maka tampilkan error!
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("The password is not strong enough!");
  // }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already used!");
  }

  //hashing password (salt)
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
  });

  return user;
};

//static login method
User.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled!");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorect Username");
  }

  const match = await bcryptjs.compare(password, user.password);
  if (!match) {
    throw Error("Incorect Password!");
  }

  return user;
};

//export with creating a collection called Users
export default mongoose.model("Users", User);
