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
exports.cancelAppointmentsController = exports.scheduleAppointmentsController = exports.getAppointmentsByIdController = exports.getAppointmentsController = void 0;
const appoimentServis_1 = require("../Services/appoimentServis");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appoimentServis_1.getAppointmentServis)();
        res.status(200).json({
            message: "Citas obtenidas correctamente",
            data: appointments
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appoimentServis_1.getAppointmentByIdServis)(parseInt(req.params.id));
        res.status(200).json({
            message: "Obtener el detalle de un turno específico",
            data: appointment
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getAppointmentsByIdController = getAppointmentsByIdController;
const scheduleAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appoimentServis_1.registerAppService)(req.body);
        res.status(201).json({
            message: "Agendar una cita",
            data: newAppointment
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.scheduleAppointmentsController = scheduleAppointmentsController;
const cancelAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancelledAppointment = yield (0, appoimentServis_1.cancelAppointmentService)(parseInt(req.params.id, 10));
        res.status(200).json({
            message: "Cambiar el estado de una cita a cancelada",
            data: cancelledAppointment
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.cancelAppointmentsController = cancelAppointmentsController;
