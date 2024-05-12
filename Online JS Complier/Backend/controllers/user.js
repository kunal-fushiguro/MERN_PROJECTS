import { Users } from "../models/users.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    //
    if (!username || !password) {
      return res.json({ msg: "plz provide all fields" });
    }

    //
    const userFind = await Users.findOne({ username: username });
    if (!userFind) {
      return res.json({ msg: "User not find" });
    }

    //
    const passwordCorrect = await comparePassword(password, userFind.password);
    if (!passwordCorrect) {
      return res.json({ msg: "usename or password is wrong" });
    }

    //
    return res.json({
      msg: "User login successfully",
      id: userFind._id,
      value: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //
    if (!username || !email || !password) {
      return res.json({ msg: "plz provide all fields" });
    }

    //
    const hashpass = await hashPassword(password);
    if (!hashpass) {
      return res.json({ msg: "Something ween wrong 1" });
    }

    //
    const newUser = await Users.create({
      username: username,
      email: email,
      password: hashpass,
    });
    if (!newUser) {
      return res.json({ msg: "Something ween wrong 2" });
    }

    return res.json({
      msg: "User created",
      id: newUser._id,
      value: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const saveCode = async (req, res) => {
  try {
    //
    const { id, code } = req.body;
    if (!id) {
      return res.json({
        msg: "not login",
        value: false,
      });
    }

    //
    const getuser = await Users.findByIdAndUpdate(id, { code: `${code}` });
    if (!getuser) {
      return res.json({ msg: "User not found." });
    }

    //
    return res.json({
      msg: "code saved successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getCode = async (req, res) => {
  try {
    //
    const { id } = req.body;
    if (!id) {
      return res.json({
        msg: "id not found plz login",
        value: false,
      });
    }

    //
    const user = await Users.findById(id);
    if (!user) {
      return res.json({
        msg: "user not found",
        value: false,
      });
    }

    //
    return res.json({
      msg: "success",
      code: user.code,
      username: user.username,
      value: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { userLogin, userRegister, saveCode, getCode };
