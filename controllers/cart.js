const { CartAddSchema } = require("../joiSchemas/cartSchema");
const Cart = require("../models/cart");

exports.cartAdd = async (req, res) => {
  try {
    const { error, value } = CartAddSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(403).json({ error: error.message });
    }
    const { productId, quantity, price } = req.body;
    const user = req.user.id;

    //find if cart exists for the user
    let cart = await Cart.findOne({ user_id: user });

    //if cart doesnt exist create a new cart
    if (!cart) {
      const newCart = await Cart.create({
        user_id: user,
        items: [{ productId, quantity, price }],
      });
      return res.status(201).json({
        message: "Cart Created and Product Added to cart",
        cart: newCart,
      });
    }

    //if cart exist for this user
    if (cart) {
      // find the index of the product we are trying to add
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        // if product exist in cart just update the quantity of that product
        let foundProductInCart = cart.items[itemIndex];
        foundProductInCart.quantity = quantity;

        //adding the updated product quantity back in the product
        cart.items[itemIndex] = foundProductInCart;
      } else {
        //product does not exists in cart, add new item
        cart.items.push({ productId, quantity, price });
      }
      cart = await cart.save();
      return res
        .status(201)
        .json({ message: "Product Added to cart", cart: cart });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.cartDelete = async (req, res) => {
  try {
    const user = req.user.id;

    const deletedCart = await Cart.findOneAndDelete({ user_id: user });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res
      .status(200)
      .json({ message: "Cart deleted successfully", deletedCart });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};
