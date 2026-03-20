import { createContext, useContext, useState } from "react";
import { api } from "../src/api/api";

const HomeContext = createContext();

export const useHomeContext = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [turnosStates, setTurnosStates] = useState([]);

  const getUserAppointments = async (userIdParam) => {
    try {
      const userId = userIdParam || localStorage.getItem("userId");

      if (!userId) {
        setUserName("");
        setTurnosStates([]);
        return;
      }

      const data = await api(`/users/${userId}`);
      setUserName(data.userFound?.name || "");
      setTurnosStates(data.userFound?.appointments || []);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      setUserName("");
      setTurnosStates([]);
    }
  };

  return (
    <HomeContext.Provider
      value={{ userName, turnosStates, getUserAppointments }}
    >
      {children}
    </HomeContext.Provider>
  );
};
