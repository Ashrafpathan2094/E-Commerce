const Cart = require("../models/cart");

exports.cartAdd = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const user = req.user.id;

    //find if cart exists for the user
    let cart = await Cart.findOne({ user });

    //if cart doesnt exist create a new cart
    if (!cart) {
      const newCart = await Cart.create({
        user_id: user,
        items: [{ productId, quantity, price }],
      });
    }

    //if cart exist for this user
    if (cart) {
      // find the index of the product we are trying to add
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        // if product exist in cart just update the quantity of that product
        let foundProductInCart = cart.items[itemIndex];
        foundProductInCart.quantity = quantity;

        //adding the updated product quantity back in the product
        cart.items[itemIndex] = foundProductInCart;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, price });
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
