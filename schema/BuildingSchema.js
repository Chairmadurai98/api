
import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema({

  buildingName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: Boolean,
    default : true
  },
  _campusId: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
},
{
  timestamps: true
}

)



export default mongoose.model("Building", BuildingSchema)