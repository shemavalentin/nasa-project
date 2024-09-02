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

// Schema is less nothing when it's not connected to a collection of documents
// and to connect a schema to a collection we use a Model given by mongoose library.
// In the model we pass it the name of the collection and the schema we built

// This model connects launchesSchema with the 'launches' collections (MongoDb collections should always be in plural)
module.exports = mongoose.model("Launch", launchSchema); // Lauch here must be in singular cze mode pluralize it automatically to meet the collection of many documents exists in collections
// We have to export the Mongoose Model
// When a Model is set to use a schema, Mongoose calls this statement compiling the model.
