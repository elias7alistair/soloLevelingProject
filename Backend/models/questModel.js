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
            required: true,
            
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        completeBy: {
            type: String,

        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false
        }

    }, {
    timestamps: true,
}

)

const Quest = Mongoose.model('Quest', questSchema,)
export default Quest