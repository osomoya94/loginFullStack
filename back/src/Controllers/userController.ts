import { Request, Response } from "express";
import { userLoginDTO, userLoginSccDTO, userRegisterDTO } from "../dtos/userDto";
import { get } from "http";
import { getUserByidServis, getUserServis, loginUserService, registerUserService } from "../Services/userServis";
import { IUser } from "../interfaces/IUserInterface";
import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
import { PostgresError } from "../interfaces/ErrorInterface";


export const getUserController= async(req:Request, res: Response):Promise<void>=>{
    try {
        const users = await getUserServis();
        res.status(200).json({
            message: "Usuarios obtenidos correctamente",
            data: users
        });
    }catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error desconocido al obtener usuarios"
        });
    }
};

export const getUserByIdController= async(req:Request<{id:string}>, res: Response):Promise<void>=>{
    try {
        const userFound = await getUserByidServis(parseInt(req.params.id));
        res.status(200).json({userFound});
    } catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }

};

export const registerUserController= async(req:Request<unknown,unknown,userRegisterDTO>, res: Response):Promise<void>=>{
    try {
        const userRegisterResponse = await registerUserService(req.body);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            data: userRegisterResponse
        });
    } catch (error) {
        const err = error as PostgresError
        res.status(400).json({
            message: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido "
        });
    }
};

export const loginUserController= async(req:Request<unknown,unknown,userLoginDTO>, res: Response):Promise<void>=>{
    try {
        const user: userLoginSccDTO = await loginUserService(req.body);
        res.status(200).json({
            login: true,
            user
        });
    } catch (error) {

        res.status(400).json({
            message: error instanceof Error ? error.message : "Error desconocido "
        });
    }
};