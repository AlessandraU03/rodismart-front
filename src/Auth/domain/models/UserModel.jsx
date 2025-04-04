export class UserModel {
  constructor(token, userType, expiresAt) {
    this.token = token;
    this.userType = userType;
    this.expiresAt = expiresAt;
  }
}
