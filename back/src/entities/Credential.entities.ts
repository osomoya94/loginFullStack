import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entities";

@Entity({name: "credentials"})
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @OneToOne(()=> User, (user) => user.credentials)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}