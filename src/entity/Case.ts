import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CaseStatus } from '../utils/constants';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: CaseStatus, default: CaseStatus.NEW })
  status!: CaseStatus;

  @Column({ type: 'text', nullable: true })
  resolutionText?: string;

  @Column({ type: 'text', nullable: true })
  cancellationReason?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
