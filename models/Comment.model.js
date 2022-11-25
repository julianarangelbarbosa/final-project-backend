const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    description_comment: {
      type: String,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    bankStockId: { type: Schema.Types.ObjectId, ref: "BankStock" },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
