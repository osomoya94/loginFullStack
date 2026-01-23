import { Children, createContext, useState } from "react";
import Login from "../src/views/Login/Login";
import axios from "axios";

export const UserContext = createContext({
    userId:"",
    turnosState : [],
    LoginUser:async()=>{},
    logOutUser: ()=>{},
    getUserAppointments: async()=>{},
    createUserApointment: async()=>{},
    cancelAppointment: async()=>{}
});

export const UserProvider = ({children})=>{
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [turnosState, setTurnosStates] = useState([]);

    const LoginUser = async (values)=>{
        const response = await axios.post('http://localhost:3000/users/login', values)
        localStorage.setItem("userId",response.data.user.id)
        setUserId(response.data.user.id)
        return response
    };

    const logOutUser = ()=>{
        localStorage.removeItem("userId")
        setUserId(null)
    };
    
    const getUserAppointments=async()=>{
    try {
        const respuesta= await axios.get(`http://localhost:3000/users/${userId}`);
        setTurnosStates(respuesta.data.userFound.appointments || []);
    } catch (error) {
        console.error("Error al obtener los turnos:", error);
        setTurnosStates([]);
    }
};

    const createUserApointment =async(values)=>{
        await axios.post('http://localhost:3000/appointments/schedule', values);
        await getUserAppointments(); 
    };

    const cancelAppointment = async(id)=>{
        await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        const nuevoArrayTurnos = turnosState.map(turno=>{
            if(turno.id === id){
                turno.status = "cancelled"
                return turno
            }else return turno
        }) 
        setTurnosStates(nuevoArrayTurnos);

    }

    const value ={
        userId,
        LoginUser,
        logOutUser,
        getUserAppointments,
        turnosState,
        createUserApointment,
        cancelAppointment
    };

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}