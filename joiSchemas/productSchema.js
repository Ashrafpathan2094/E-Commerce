const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().min(3).required(),

  description: Joi.string().min(3).required(),

  price: Joi.string().min(1).required(),

  discountPercentage: Joi.string().required(),

  rating: Joi.string().min(1).required(),

  stock: Joi.string().min(1).required(),

  brand: Joi.string().required(),

  category: Joi.string().min(3).required(),

  thumbnail: Joi.string()
    .min(3)
    .required()
    .regex(/.(jpg|jpeg|png|gif)$/i),

  images: Joi.array().items(Joi.string().regex(/.(jpg|jpeg|png|gif)$/i)),
});

module.exports = {
  productSchema,
};
