
import mongoose from "mongoose";

const CampusSchema = new mongoose.Schema({

  name : {
    type :String,
    unique : true,
    required : true,
    trim : true
  },
  place : {
    type :String,
  },
  status : {
    type : Boolean,
    default : true
  },
  buildings : {
    type : Array,
    default : []
  }
},
{
  timestamps: true
}

)



export default mongoose.model("Campus", CampusSchema)