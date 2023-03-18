const Joi = require("joi");

const userRegisterSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string()
    .pattern(/^\d{10}$/) // enforce 10-digit format
    .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),
});

module.exports = {
  userRegisterSchema,
};
