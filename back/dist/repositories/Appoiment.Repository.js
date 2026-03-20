"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const Appointment_entities_1 = require("../entities/Appointment.entities");
const data_source_1 = require("../config/data-source");
const IAppointmentInterfaces_1 = require("../interfaces/IAppointmentInterfaces");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_entities_1.Appointment).extend({
    validateAllwAppointment: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
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
        if (hours < 8 || hours > 17) {
            throw new Error("las citas solo se pueden agendar entre las 8:00 y las 18:00 horas");
        }
    },
    validateExistisAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFound = yield this.findOne({
                where: {
                    user: { id: userId },
                    time: time,
                    date: date,
                    status: IAppointmentInterfaces_1.Status.active
                }
            });
            if (appointmentFound) {
                throw new Error(`Ya existe una cita para el usuario con id: ${userId}`);
            }
        });
    }
});
