import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export interface IIdentifiable {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Identifiable implements IIdentifiable {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
