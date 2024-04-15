import bcrypt from "bcrypt";

const hashPassword = async (value, pass) => {
  try {
    const hashpass = await bcrypt.hash(pass, value);
    return hashpass;
  } catch (error) {
    if (error) {
      throw Error("Something Went wrong Duration password Hashing ");
    }
  }
};

const comparePassword = async (hashPassword, password) => {
  try {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
  } catch (error) {
    throw Error("Something Went wrong Duration password Comparing ");
  }
};

export { hashPassword, comparePassword };
