import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { IUser } from "../models/user";
import { refreshToken } from "../interfaces/user";
import { ITask } from "../models/task";

const signUpBodyValidation = (body: IUser) => {
  const schema = Joi.object({
    username: Joi.string().required().label("username"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password")
  });

  return schema.validate(body);
};

const logInBodyValidation = (body: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password")
  });
  return schema.validate(body);
};

const refreshTokenBodyValidation = (body: refreshToken) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("refreshToken")
  });
  return schema.validate(body);
};

const taskBodyValidation = (body: ITask) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("userId"),
    name: Joi.string().required().label("name"),
    description: Joi.string().label("description"),
    status: Joi.array().label("status"),
    priority: Joi.boolean().label("priority")
  });
  return schema.validate(body);
};

const taskUpdateBodyValidation = (body: ITask) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("userId"),
    name: Joi.string().label("name"),
    description: Joi.string().label("description"),
    status: Joi.array().label("status"),
    priority: Joi.boolean().label("priority")
  });
  return schema.validate(body);
};

export {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
  taskBodyValidation,
  taskUpdateBodyValidation
};
