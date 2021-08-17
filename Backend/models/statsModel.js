import Mongoose from "mongoose"


const statsSchema = Mongoose.Schema(
    {
        level:
        {
            type: Number,
            required: true,
            default: 0
        },
        experience: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
            unique: true
        },
    }
)

const Stats = Mongoose.model('Stats', statsSchema)
export default Stats