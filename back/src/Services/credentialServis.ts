import { Credential } from "../entities/Credential.entities";
import { CredentialModel } from "../config/data-source";
import { EntityManager } from "typeorm";


/* generar contrasenia encriptada */
const crypPass = async (password: string): Promise<string> => {
    const ecoder = new TextEncoder();
    const data = ecoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const getCredentialService = async (entityManager:EntityManager, username: string, password: string): Promise<Credential> =>{
        const credentialFound = await CredentialModel.findOne({
            where: { username: username }
        });

        if (credentialFound) {
            throw new Error(`El usuario ${username} ya existe, por favor elija otro.`);
        }

        const credential: Credential = entityManager.create(Credential, {
            username: username,
            password: await crypPass(password)
        });

        return await entityManager.save(credential);
        
};

export const checkUserCredentialService =async(username:string, password:string):Promise<number>=>{

    const credentialFound = await CredentialModel.findOne({
        where: {username: username}
    });
    if(credentialFound?.password === await crypPass(password))return credentialFound.id;
    else throw new Error("usuario o contraseña incorrectos");
};
