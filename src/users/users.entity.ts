import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @Column({ type: 'timestamp' })
  updated_at: Timestamp;

  @BeforeInsert()
  async insertPassword(): Promise<any> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
