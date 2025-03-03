/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string; // Will be hashed if using JWT login

  @Column({ nullable: true })
  githubId: string; // For GitHub OAuth

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;
}
