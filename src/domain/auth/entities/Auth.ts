export class Auth {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    // e-mail
    this.is_required(email);
    this.is_mailAddress(email);
    // password
    this.is_required(password);

    this.email = email;
    this.password = password;
  }

  private is_required(value: string) {
    if (!value) throw new Error("The field is required");
    return value;
  }

  private is_mailAddress(value: string) {
    const regexp =
      /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!regexp.test(value)) throw new Error("The field is e-mail");
    return value;
  }
}
