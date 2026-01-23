import { Request, Response, Router } from "express";
import { cancelAppointmentsController, scheduleAppointmentsController, getAppointmentsController, getAppointmentsByIdController } from "../Controllers/appointmentsController";
import { scheduleAppDTO } from "../dtos/appointmentsDTO";

const appointmentsRoutes: Router = Router();


appointmentsRoutes.get("/",(req:Request,res:Response):Promise<void> =>getAppointmentsController(req,res));

appointmentsRoutes.get("/:id",(req:Request<{id:string}>,res:Response):Promise<void> =>getAppointmentsByIdController(req,res));

appointmentsRoutes.post("/schedule",(req:Request<unknown,unknown,scheduleAppDTO>,res:Response):Promise<void> =>scheduleAppointmentsController(req,res));

appointmentsRoutes.put("/cancel/:id",(req:Request<{id:string}>,res:Response):Promise<void> =>cancelAppointmentsController(req,res));


export default appointmentsRoutes;