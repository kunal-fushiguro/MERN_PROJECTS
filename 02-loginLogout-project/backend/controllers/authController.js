import { User } from "../models/user.models.js";
import { hashpass, comparepass } from "../helper/hashPassword.js";

const test = (req, res) => {
  res.json({ message: "homepage" });
};

// register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking every field
    if (!name) {
      return res.status(400).json({
        error: "Name is Required To Register a User",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email is Required To Register a User",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        error:
          "Password is Required To Register a User and Should be Greater Then 6 Character",
      });
    }
    // checking user Exist or not
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({
        error: "Email Already Exist in DataBase",
      });
    }

    // hashing password
    const hashPassword = await hashpass(password);

    // creating User
    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      createUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if User Exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User Not Found ",
      });
    }

    // check password match
    const match = await comparepass(password, user.password);

    if (!match) {
      return res.status(401).json({
        error: "Entered a Wrong Detail",
      });
    } else {
      res.status(200).json({
        user,
        message: "ok you login in",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { test, registerUser, loginUser };
