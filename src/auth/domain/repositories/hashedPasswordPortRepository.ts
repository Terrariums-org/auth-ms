export interface HashedPasswordPortRepository {
  createPasswordHash(password: string): Promise<string>;
  compareCredentials(
    originalPassword: string,
    passwordRequest: string,
  ): Promise<boolean>;
}
