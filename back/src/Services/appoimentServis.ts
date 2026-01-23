import { scheduleAppDTO } from "../dtos/appointmentsDTO";
import { Appointment } from "../entities/Appointment.entities";
import { IAppointment } from "../interfaces/IAppointmentInterfaces";
import { Status } from "../interfaces/IAppointmentInterfaces"; // Si Status está definido ahí
import { AppointmentRepository } from "../repositories/Appoiment.Repository";
import app from "../server";
import { getUserByidServis } from "./userServis";



export const getAppointmentServis = async():Promise<Appointment[]>=>{
    return await AppointmentRepository.find()
};

export const getAppointmentByIdServis= async (id:number):Promise<Appointment | null>=>{
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: id
        }
    });
    if(!appointmentFound) throw new Error(`Cita con id ${id} no encontrada`);
    else return appointmentFound;
};

export const registerAppService = async (appointment: scheduleAppDTO): Promise<scheduleAppDTO> => {
    await getUserByidServis(appointment.userId);
    AppointmentRepository.validateAllwAppointment(appointment.date, appointment.time);
    await AppointmentRepository.validateExistisAppointment(appointment.userId, appointment.date, appointment.time);

    const newAppointment: Appointment = AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    })

    await AppointmentRepository.save(newAppointment);
    return {
        date: newAppointment.date,
        time: newAppointment.time,
        userId: newAppointment.user.id
    };

}


export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: id
        }
    });
    if(!appointmentFound) throw new Error(`Cita con id ${id} no encontrada`);
    appointmentFound.status = Status.cancelled;
    await AppointmentRepository.save(appointmentFound);
    return appointmentFound;
}


