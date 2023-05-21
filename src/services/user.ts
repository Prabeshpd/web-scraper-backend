import * as crypt from '../utils/crypt';
import User, { UserPayload } from '../models/User';

export async function addUser(userPayload: UserPayload) {
  const password = userPayload.password;
  const cryptedPassword = await crypt.hash(password);
  const payload = { ...userPayload, password: cryptedPassword, is_active: true };
  const [user] = await User.insertData(payload);

  return user;
}
