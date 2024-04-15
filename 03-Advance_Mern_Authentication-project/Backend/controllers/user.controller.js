import { User } from "../models/user.models.js";
import { hashPassword, comparePassword } from "../utils/passwordHasing.js";
import jwt from "jsonwebtoken";

// User Sign Up or Register
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //   checking data is sended by User
    if (!name) {
      return res.status(400).json({
        message: "Name Field Is Required",
      });
    }
    if (!password && password.length > 6) {
      return res.status(400).json({
        message:
          "password Field Is Required And it should be more than 6 character",
      });
    }
    //   checking if User email is already existed in databse
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        message: "Email Is Already Used For SignUP",
      });
    }
    //   Encrypt The User Password
    const hashpass = await hashPassword(12, password);
    const createUser = await User.create({
      name: name,
      email: email,
      password: hashpass,
    });
    if (!createUser) {
      res.status(500).json({
        message: "Something Went Wrong in Server Side ",
      });
    }
    return res.status(201).json({
      message: "User Have Been Created ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went Wrong",
    });
  }
};

// user Signin or login
const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  //   check user send data properly or not
  if (!email) {
    return res.status(400).json({
      message: "Email is Required To SignIn",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Email is Required To SignIn",
    });
  }
  //   checking User Exist Or not
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(404).json({
      message: "User Not Found Plz SignUp To SignIn",
    });
  }

  // checking Password is Correct
  const match = await comparePassword(userExist.password, password);
  if (!match) {
    return res.status(401).json({
      message: "Entered A Wrong User Credentials",
    });
  }
  //   creating jwt token
  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECERT_KEY, {
    expiresIn: "1hr",
  });

  return res
    .status(200)
    .cookie(String(userExist._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    })
    .json({
      message: "Sign In SuccessFully",
      TOKEN: token,
    });
};

// verify user token
const verifyUser = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(404).json({
      message: "Cookies Not Found",
    });
  }
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({
      message: "token Not Found",
    });
  }
  jwt.verify(String(token), process.env.JWT_SECERT_KEY, (err, decode) => {
    if (err) {
      res.status(400).json({
        message: "Invalid token",
      });
    }
    // console.log(decode.id);
    req.id = decode.id;
  });
  next();
};

// get user
const getUser = async (req, res, next) => {
  const user_id = req.id;
  try {
    const user = await User.findById(user_id, "-password");
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

export { userSignUp, userSignIn, verifyUser, getUser };
