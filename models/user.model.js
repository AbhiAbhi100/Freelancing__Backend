import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["freelancer", "client"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      portfolio: { type: String }, // URL to portfolio file
      portfolioOriginalName: { type: String },
      hourlyRate: { type: Number }, // For freelancers
      client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
