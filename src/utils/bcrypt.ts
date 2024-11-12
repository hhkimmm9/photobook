import bcrypt from 'bcryptjs';

const verifyPassword = async (inputPassword: string, hashedPassword: string) => {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  return match;
};

export default verifyPassword;