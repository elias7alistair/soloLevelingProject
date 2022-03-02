import Mongoose from "mongoose";

const goalSchema = Mongoose.Schema(
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
    impact: {
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

const Goal = Mongoose.model("Goal", goalSchema);
export default Goal;
