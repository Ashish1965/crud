import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const taskSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "signup",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile : {
    type:String,
    required:true,
  },
  designation : {
    type:String,
    required:true,
  },
  gender : {
    type:String,
    required:true,
  },
  course : {
    type:String,
    required:true,
  },
  mediaUrl: {
    type: String,
    required: true,
  }
});

export default mongoose.models.task ||
  mongoose.model("task", taskSchema);
