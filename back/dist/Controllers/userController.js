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
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUserController = void 0;
const userServis_1 = require("../Services/userServis");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServis_1.getUserServis)();
        res.status(200).json({
            message: "Usuarios obtenidos correctamente",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error desconocido al obtener usuarios"
        });
    }
});
exports.getUserController = getUserController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield (0, userServis_1.getUserByidServis)(parseInt(req.params.id));
        res.status(200).json({ userFound });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRegisterResponse = yield (0, userServis_1.registerUserService)(req.body);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            data: userRegisterResponse
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido "
        });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userServis_1.loginUserService)(req.body);
        res.status(200).json({
            login: true,
            user
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Error desconocido "
        });
    }
});
exports.loginUserController = loginUserController;
