//creating schema to the database
import mongoose from "mongoose";

const Contact = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//export with creating a collection called Contacts
export default mongoose.model("Contacts", Contact);
