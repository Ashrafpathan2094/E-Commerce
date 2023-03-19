const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
        price: Number,
      },
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
    total_price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartSchema);
