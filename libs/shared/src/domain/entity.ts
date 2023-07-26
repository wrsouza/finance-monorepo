export abstract class Entity {
  readonly id: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(values: any) {
    Object.assign(this, values);
  }
}
