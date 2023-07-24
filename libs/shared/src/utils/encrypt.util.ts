import { compareSync, hashSync } from 'bcrypt';

export class Encrypt {
  static hash(value: string): string {
    return hashSync(value, 10);
  }

  static compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
