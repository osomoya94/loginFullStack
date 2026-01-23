export interface IAppointment{
    id:number,
    date: Date,
    time:string,
    userId: Number,
    status:Status
}

export enum Status{
    active = 'active',
    cancelled = 'cancelled'
}
