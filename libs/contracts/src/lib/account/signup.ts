export namespace AccountSignUp {
  export const topic = 'account.signup.command';

  export class Request {
    email: Email;
    nickname: UniqueString;
    password: SomeString;
  }

  export class Response {
    email: Email;
  }
}
