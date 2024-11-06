import { users } from "../data/users";

export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): boolean {
  console.log("auth ", email, password);

  return !!users.find(
    (user) => user.email === email && user.password === password
  );
}
