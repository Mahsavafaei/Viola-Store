import { hash, compare } from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  //returned true or false
  return isValid;
};

export { hashPassword, verifyPassword };
