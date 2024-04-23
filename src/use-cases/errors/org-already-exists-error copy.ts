export class AuthError extends Error {
  constructor() {
    super('E-mail or password invalid')
  }
}
