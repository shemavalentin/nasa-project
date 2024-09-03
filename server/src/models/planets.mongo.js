// The file to structure how data in planets collection will look

const mongoose = require("mongoose");
const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// The Model here compiles and allows us to use the schema. It's the model that allows
// us to connect the schema to collections and we querry the model from the our server.
// Mongoosse provides us these schema where we give data types to our data.
module.exports = mongoose.model("Planet", planetSchema); // here we compiled a mongoose schema and assigned it to a collection in MongoDB.
