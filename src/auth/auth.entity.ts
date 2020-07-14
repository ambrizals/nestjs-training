import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity('users')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @Column({ type: 'timestamp' })
  updated_at: Timestamp;

  @BeforeInsert()
  async updatePasswords(): Promise<any> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
