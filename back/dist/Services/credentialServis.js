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
exports.checkUserCredentialService = exports.getCredentialService = void 0;
const Credential_entities_1 = require("../entities/Credential.entities");
const data_source_1 = require("../config/data-source");
/* generar contrasenia encriptada */
const crypPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const ecoder = new TextEncoder();
    const data = ecoder.encode(password);
    const hash = yield crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
});
const getCredentialService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield data_source_1.CredentialModel.findOne({
        where: { username: username }
    });
    if (credentialFound) {
        throw new Error(`El usuario ${username} ya existe, por favor elija otro.`);
    }
    const credential = entityManager.create(Credential_entities_1.Credential, {
        username: username,
        password: yield crypPass(password)
    });
    return yield entityManager.save(credential);
});
exports.getCredentialService = getCredentialService;
const checkUserCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield data_source_1.CredentialModel.findOne({
        where: { username: username }
    });
    if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) === (yield crypPass(password)))
        return credentialFound.id;
    else
        throw new Error("usuario o contraseña incorrectos");
});
exports.checkUserCredentialService = checkUserCredentialService;
