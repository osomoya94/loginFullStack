import { AppDataSource, UserModel } from "../config/data-source";
import { userLoginDTO, userLoginSccDTO, userRegisterDTO, userResponseDTO } from "../dtos/userDto";
import { User } from "../entities/User.entities";
import { checkUserCredentialService, getCredentialService } from "./credentialServis";


export const getUserServis =async ():Promise<userResponseDTO[]>=>{
    return await UserModel.find()
};

export const getUserByidServis = async(id:number):Promise<User | null> =>{
    const userFound = await UserModel.findOne({
        where: {id: id},
        relations: ["appointments"]
    });
    if(!userFound)throw new Error(`Usuario con id ${id} no encontrado`);
    else return userFound;
};

export const registerUserService = async (user:userRegisterDTO):Promise<userResponseDTO>=>{
    const resultadoTransaction = await AppDataSource.transaction(async (entityManager) => {
        const idUserCredential = await getCredentialService(entityManager, user.username, user.password);

        const newUser: User = entityManager.create(User, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            nDni: user.nDni,
            credentials: idUserCredential
        });
        await entityManager.save(newUser);
        return newUser;
    });
    return {
        name: resultadoTransaction.name,
        email: resultadoTransaction.email
    };
}

export const loginUserService = async (user: userLoginDTO): Promise<userLoginSccDTO> => {
    const credentialId = await checkUserCredentialService(user.username, user.password);
    const userFound: User | null = await UserModel.findOne({
        where: { credentials: { id: credentialId } }
    });

    return {
        id: userFound?.id ?? 0,
        name: userFound?.name ?? "",
        email: userFound?.email ?? "" ,
        birthdate: userFound?.birthdate ?? new Date(),
        nDni: userFound?.nDni ?? 0
    };  
}
