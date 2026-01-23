import { Request, Response } from "express";
import { scheduleAppDTO } from "../dtos/appointmentsDTO";
import { cancelAppointmentService, getAppointmentByIdServis, getAppointmentServis, registerAppService } from "../Services/appoimentServis";


export const getAppointmentsController = async (req:Request, res: Response):Promise<void> =>{
    try {
        const appointments = await getAppointmentServis();
        res.status(200).json({
            message: "Citas obtenidas correctamente",
            data: appointments
        });
    } catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};

export const getAppointmentsByIdController= async(req:Request<{id: string}>, res: Response):Promise<void> =>{
    try {
        const appointment = await getAppointmentByIdServis(parseInt(req.params.id));
        res.status(200).json({
            message: "Obtener el detalle de un turno específico",
            data: appointment
        });
    } catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};

export const scheduleAppointmentsController= async(req:Request<unknown,unknown,scheduleAppDTO>, res: Response):Promise<void> =>{
    try {
        const newAppointment = await registerAppService(req.body);
        res.status(201).json({
            message: "Agendar una cita",
            data: newAppointment
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};

export const cancelAppointmentsController = async(req:Request<{id:string}>, res: Response):Promise<void> =>{
    try {
        const cancelledAppointment = await cancelAppointmentService(parseInt(req.params.id,10));
        res.status(200).json({
            message: "Cambiar el estado de una cita a cancelada",
            data: cancelledAppointment
        });
    } catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};