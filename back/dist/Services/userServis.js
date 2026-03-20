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
exports.loginUserService = exports.registerUserService = exports.getUserByidServis = exports.getUserServis = void 0;
const data_source_1 = require("../config/data-source");
const User_entities_1 = require("../entities/User.entities");
const credentialServis_1 = require("./credentialServis");
const getUserServis = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.UserModel.find();
});
exports.getUserServis = getUserServis;
const getUserByidServis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({
        where: { id: id },
        relations: ["appointments"]
    });
    if (!userFound)
        throw new Error(`Usuario con id ${id} no encontrado`);
    else
        return userFound;
});
exports.getUserByidServis = getUserByidServis;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const resultadoTransaction = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const idUserCredential = yield (0, credentialServis_1.getCredentialService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entities_1.User, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            nDni: user.nDni,
            credentials: idUserCredential
        });
        yield entityManager.save(newUser);
        return newUser;
    }));
    return {
        name: resultadoTransaction.name,
        email: resultadoTransaction.email
    };
});
exports.registerUserService = registerUserService;
const loginUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const credentialId = yield (0, credentialServis_1.checkUserCredentialService)(user.username, user.password);
    const userFound = yield data_source_1.UserModel.findOne({
        where: { credentials: { id: credentialId } }
    });
    return {
        id: (_a = userFound === null || userFound === void 0 ? void 0 : userFound.id) !== null && _a !== void 0 ? _a : 0,
        name: (_b = userFound === null || userFound === void 0 ? void 0 : userFound.name) !== null && _b !== void 0 ? _b : "",
        email: (_c = userFound === null || userFound === void 0 ? void 0 : userFound.email) !== null && _c !== void 0 ? _c : "",
        birthdate: (_d = userFound === null || userFound === void 0 ? void 0 : userFound.birthdate) !== null && _d !== void 0 ? _d : new Date(),
        nDni: (_e = userFound === null || userFound === void 0 ? void 0 : userFound.nDni) !== null && _e !== void 0 ? _e : 0
    };
});
exports.loginUserService = loginUserService;
