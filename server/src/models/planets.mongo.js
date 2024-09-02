// The file to structure how data in planets collection will look

const mongoose = require("mongoose");
const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});
