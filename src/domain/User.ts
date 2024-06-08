interface ICreate {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
}

export class User {
  private constructor(
    public id: number,
    public firstName: string,
    public lastName?: string,
    public username?: string
  ) {}

  get fullName() {
    return this.lastName
      ? `${this.firstName} ${this.lastName}`
      : this.firstName;
  }

  static create(input: ICreate) {
    return new User(input.id, input.firstName, input.lastName, input.username);
  }
}
