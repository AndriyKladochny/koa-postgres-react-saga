import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public title: string;

  @CreateDateColumn() //{ type: 'timestamptz', readonly: true, name: 'created_at' }
  public createdAt: Date;

  @UpdateDateColumn() //{ type: 'timestamptz', readonly: true, name: 'updated_at' }
  public updatedAt: Date;
}
