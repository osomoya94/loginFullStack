import { Request, Response, Router } from "express";
import { registerUserController, getUserController, getUserByIdController, loginUserController } from "../Controllers/userController";
import { userLoginDTO, userRegisterDTO } from "../dtos/userDto";

const userRouter: Router = Router();

userRouter.get("/",(req:Request, res:Response):Promise<void>=>getUserController(req,res));

userRouter.get("/:id",(req:Request<{id:string}>, res:Response):Promise<void>=>getUserByIdController(req,res));

userRouter.post("/register",(req:Request<unknown,unknown,userRegisterDTO>, res:Response):Promise<void>=>registerUserController(req,res));

userRouter.post("/login",(req:Request<unknown,unknown,userLoginDTO>, res:Response):Promise<void>=>loginUserController(req,res));

export default userRouter;