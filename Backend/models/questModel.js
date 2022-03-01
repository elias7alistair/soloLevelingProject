import Mongoose from "mongoose";

const questSchema = Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true, unique: false
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
      default: "0",
    },
    difficulty: {
      type: String,
      required: true,
    },
    completeBy: {
      type: String,
    },
    associatedWith: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

const Quest = Mongoose.model("Quest", questSchema);
export default Quest;
