/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CodeReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'text', nullable: true })
  aiFeedback: string;

  @Column()
  language: string;

  @Column({ type: 'text', nullable: true })
  optimizedCode: string;

  @Column({ type: 'text', nullable: true })
  securityReport: string;

  @Column({ type: 'text', nullable: true })
  qualityCheck: string;

  @CreateDateColumn()
  createdAt: Date;
}
