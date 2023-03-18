const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().alphanum().min(3).required(),

  description: Joi.string().alphanum().min(3).required(),

  price: Joi.string().alphanum().min(3).required(),

  discountPercentage: Joi.string().alphanum().min(3).required(),

  rating: Joi.string().alphanum().min(3).required(),

  stock: Joi.string().alphanum().min(3).required(),

  brand: Joi.string().alphanum().min(3).required(),

  category: Joi.string().alphanum().min(3).required(),

  thumbnail: Joi.string().alphanum().min(3).required(),
});

module.exports = {
  productSchema
};
