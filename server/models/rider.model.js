const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  vehicleType: String,
  availability: [
    {
      dayOfWeek: String,
      timeSlot: String,
    },
  ],
  ridesCompleted: [
    {
      rideId: mongoose.Schema.Types.ObjectId,
      completedDate: Date,
    },
  ],
});

const Rider = mongoose.model("Rider", riderSchema);

exports.Rider = Rider;
