import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Function to create a token
function createToken(user: IUser) {
  return jwt.sign(
    { id: user.id, name: user.name, last: user.surname, email: user.email },
    config.jwtSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );
}

// Function to create a new user
export const singUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ msg: "The user already exists" });
  }
  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
};

// Function to sign in
export const singIn = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "The user does not exists" });
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token: string = createToken(user);
    res.setHeader("Access-Control-Expose-Headers", "auth-token");
    return res.status(200).header("auth-token", token).json({
      name: user.name,
      last: user.surname,
      email: user.email,
      company_id: user.company_id,
    }); // TODO: Cambiar la respuesta para que no se envie el password
  }

  return res
    .status(400)
    .json({ msg: "The username or password are incorrect" });
};
