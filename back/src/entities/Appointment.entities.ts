import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/IAppointmentInterfaces";
import { User } from "./User.entities";

@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string;

    @Column({ type: "varchar", length:10, nullable: false, default: Status.active })
    status: Status;

    @ManyToOne(() => User, user => user.appointments, { nullable: false })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;
}