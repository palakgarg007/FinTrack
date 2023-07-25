import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
    default: null,
  },
  currentTokens: {
    type: Number,
    default: 0,
  },
  dreamProductType: {
    type: String,
    default: null,
  },
  dreamProduct: {
    type: String,
    default: null,
  },
  lastTransactionRefresh: {
    type: Date,
    default: Date.now,
  },
  referKey: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  referrals: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  transactions: [
    {
      type: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      category: {
        type: String,
        default: "Others",
        enum: [
          "Shopping",
          "Food",
          "Transport",
          "Rent",
          "Installment",
          "Electronics",
          "Others",
        ],
      },
      title: {
        type: String,
        required: [true, "Title is required!"],
      },
      amount: {
        type: Number,
        required: [true, "Amount is required!"],
      },
      image: {
        type: String,
      },
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
