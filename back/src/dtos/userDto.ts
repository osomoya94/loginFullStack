export interface userRegisterDTO{
    name:string,
    email:string,
    birthdate:Date,
    nDni:number,
    username:string,
    password:string
};

export interface userLoginDTO{
    username:string,
    password:string
};

export interface userLoginSccDTO{
    id:number,
    name:string,
    email:string,
    birthdate:Date,
    nDni:number
}

export interface userResponseDTO{
    name:string,
    email:string,
}