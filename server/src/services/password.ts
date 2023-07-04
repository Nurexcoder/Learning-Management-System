import bcrypt from "bcrypt";
export const Password = {
    toHash: async (unHashedString: string) => {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(unHashedString, salt);
    return hashed;
  },
  compareIt: async (password: string, hashedPassword: string) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
  },
};
