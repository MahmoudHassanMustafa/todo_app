import * as bcrypt from 'bcrypt';

export default class Password {
  /**
   * Hashes a password
   * @param password the password to be hashed
   * @returns hashed password
   */
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  /**
   * compares the incoming password against the existing one
   *
   * @param password the password in plain text
   * @param hashed_password the hashed password
   * @returns boolean as a comparison result
   */
  static async compare(
    password: string,
    hashed_password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashed_password);
  }
}
