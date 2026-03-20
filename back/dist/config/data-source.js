"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const Appointment_entities_1 = require("../entities/Appointment.entities");
const User_entities_1 = require("../entities/User.entities");
const Credential_entities_1 = require("../entities/Credential.entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: envs_1.DB_SYNC,
    dropSchema: envs_1.DB_DROP,
    logging: envs_1.DB_LOG,
    entities: [User_entities_1.User, Credential_entities_1.Credential, Appointment_entities_1.Appointment],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(User_entities_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_entities_1.Credential);
