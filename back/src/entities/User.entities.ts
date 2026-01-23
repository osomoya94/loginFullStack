import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credential.entities";
import app from "../server";
import { Appointment } from "./Appointment.entities";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255,  nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: "date", nullable: false })
    birthdate: Date;

    @Column({ type: "int", unique:true , nullable: false })
    nDni: number;

    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credentials: Credential;

    @OneToMany(()=> Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}