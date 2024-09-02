// The file name can vary from different project, but here we are going to
// write our schema

const mongoose = require("mongoose");

// creating a constant that will store the schema defining shape of our launches.
const launchSchema = new mongoose.Schema({
  // now defining how the structure of the data that will be

  //flightNumber: Number,  // Mongoose let's you do more than defining types of data in your database but do the following also

  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 999,
    // etc
  },
  launchDate: {
    type: Date,
    required: true,
  },

  mission: {
    type: String,
    required: true,
  },

  rockets: {
    type: String,
    required: true,
  },
  //   target: {
  //     // we could say that a target references a planet in our planets collections.
  //     type: mongoose.ObjectId, // Property from mongoose to define Ids, and this ID will allow us to look up planets from that planets collection
  //     ref: "Planet",
  //     },

  // But the logic is very complicated and reqiures us to write our own sql logic in NoSQL
  // We can simplify this and store the type of planets as string.

  target: {
    type: String,
  },
  customers: [String],

  upcoming: {
    type: Boolean,
    require: true,
  },

  success: {
    type: Boolean,
    required: true, // to start off.
    default: true,
  },
});
