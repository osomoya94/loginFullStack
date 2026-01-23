import { Repository } from "typeorm";
import { Appointment } from "../entities/Appointment.entities";
import { AppDataSource } from "../config/data-source";
import { Status } from "../interfaces/IAppointmentInterfaces";


export const AppointmentRepository  = AppDataSource.getRepository(Appointment).extend({
    validateAllwAppointment: function (date: Date, time: string) {
        const [ hours, minutes ] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();

        const appointmentDateInArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

        if (appointmentDateInArg < nowInArg) {
            throw new Error("no se puede agendar una cita en fechas pasadas");
        }

        const diffMillSeconds = appointmentDate.getTime() - today.getTime();
        const diffInHours = diffMillSeconds / (1000 * 60 * 60);
        if (diffInHours < 24) {
            throw new Error("no se puede agendar una cita con menos de 24 horas de anticipación");
        }

        const dayOfWeek = appointmentDateInArg.getUTCDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            throw new Error("no se puede agendar una cita los fines de semana");
        }

        if(hours < 8 || hours > 17) {
            throw new Error("las citas solo se pueden agendar entre las 8:00 y las 18:00 horas");
        }
    },

    validateExistisAppointment: async function (userId: number, date: Date, time: string):Promise<void> {
        const appointmentFound = await this.findOne({
            where: {
                user: { id: userId },
                time: time,
                date: date,
                status: Status.active
            }
        })
        if (appointmentFound) {
            throw new Error(`Ya existe una cita para el usuario con id: ${userId}`);
        }
    }

});