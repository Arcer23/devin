import userModel from "../models/user.model.js";
import userServices from "../services/user.service.js";
import { ExpressValidator } from "express-validator";
const createUserController = async (req, res) => {
  const errors = await ExpressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userServices.createUser(req.body);
    const token = await userModel.generateToken();
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
