export namespace AccountSignIn {
  export const topic = 'account.sigin.command';

  export class Request {
    email: Email;
    password: SomeString;
  }

  export class Response {
    accessToken: Token;
    refreshToken: Token;
  }
}
