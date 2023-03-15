const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
        price: Number,
      },
    ],
    total_price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartSchema);
