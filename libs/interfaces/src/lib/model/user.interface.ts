export interface User {
  id: Uuid;
  nickname: UniqueString;
  email: Email;
  password: Hash;
}
