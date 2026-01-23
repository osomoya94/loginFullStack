import axios from "axios";
import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export const useHomeContext = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [turnosStates, setTurnosStates] = useState([]);

    const getUserAppointments = async (userId) => {
        try {
        const respuesta = await axios.get(`http://localhost:3000/users/${userId}`);
        const { name, appointments } = respuesta.data.userFound;
        setUserName(name || "");
        setTurnosStates(appointments || []);
        } catch (error) {
        console.error("Error al obtener los turnos:", error);
        setTurnosStates([]);
        }
    };

    return (
        <HomeContext.Provider value={{ userName, turnosStates, getUserAppointments }}>
        {children}
        </HomeContext.Provider>
    );
};