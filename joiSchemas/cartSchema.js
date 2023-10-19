const Joi = require("joi");

const CartAddSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
});

module.exports = {
  CartAddSchema,
};
