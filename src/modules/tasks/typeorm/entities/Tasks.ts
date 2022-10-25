import User from "@modules/users/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
class Tasks {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  completed: boolean;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default Tasks;