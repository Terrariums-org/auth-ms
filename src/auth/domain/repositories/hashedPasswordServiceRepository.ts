export interface HashedPasswordServiceRepository {
  encodePassword(password: string): Promise<string>;
  comparePassword(
    originalPassword: string,
    passwordRequest: string,
  ): Promise<boolean>;
}
