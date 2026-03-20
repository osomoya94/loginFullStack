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
exports.cancelAppointmentService = exports.registerAppService = exports.getAppointmentByIdServis = exports.getAppointmentServis = void 0;
const IAppointmentInterfaces_1 = require("../interfaces/IAppointmentInterfaces"); // Si Status está definido ahí
const Appoiment_Repository_1 = require("../repositories/Appoiment.Repository");
const userServis_1 = require("./userServis");
const getAppointmentServis = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Appoiment_Repository_1.AppointmentRepository.find();
});
exports.getAppointmentServis = getAppointmentServis;
const getAppointmentByIdServis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appoiment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: id
        }
    });
    if (!appointmentFound)
        throw new Error(`Cita con id ${id} no encontrada`);
    else
        return appointmentFound;
});
exports.getAppointmentByIdServis = getAppointmentByIdServis;
const registerAppService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userServis_1.getUserByidServis)(appointment.userId);
    Appoiment_Repository_1.AppointmentRepository.validateAllwAppointment(appointment.date, appointment.time);
    yield Appoiment_Repository_1.AppointmentRepository.validateExistisAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = Appoiment_Repository_1.AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    });
    yield Appoiment_Repository_1.AppointmentRepository.save(newAppointment);
    return {
        date: newAppointment.date,
        time: newAppointment.time,
        userId: newAppointment.user.id
    };
});
exports.registerAppService = registerAppService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appoiment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: id
        }
    });
    if (!appointmentFound)
        throw new Error(`Cita con id ${id} no encontrada`);
    appointmentFound.status = IAppointmentInterfaces_1.Status.cancelled;
    yield Appoiment_Repository_1.AppointmentRepository.save(appointmentFound);
    return appointmentFound;
});
exports.cancelAppointmentService = cancelAppointmentService;
