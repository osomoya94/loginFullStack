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
exports.cancelAppointments = exports.createAppointments = exports.getAppointmentsById = exports.getAppointments = void 0;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("estamos en la ruta de gat user probando");
});
exports.getAppointments = getAppointments;
const getAppointmentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("estamos en la ruta de gat user probando en id");
});
exports.getAppointmentsById = getAppointmentsById;
const createAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("estamos en la ruta de post user probando en id");
});
exports.createAppointments = createAppointments;
const cancelAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("estamos en la ruta de post de login");
});
exports.cancelAppointments = cancelAppointments;
