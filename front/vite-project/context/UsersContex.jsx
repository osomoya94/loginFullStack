import { createContext, useState } from "react";
import { api } from "../src/api/api";

export const UserContext = createContext({
  userId: "",
  turnosState: [],
  LoginUser: async () => {},
  logOutUser: () => {},
  getUserAppointments: async () => {},
  createUserApointment: async () => {},
  cancelAppointment: async () => {},
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [turnosState, setTurnosStates] = useState([]);

  const LoginUser = async (values) => {
    const data = await api("/users/login", {
      method: "POST",
      body: values,
    });
    localStorage.setItem("userId", data.user.id);
    setUserId(data.user.id);
    return { status: 200, data };
  };

  const logOutUser = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  const getUserAppointments = async () => {
    try {
      if (!userId) {
        setTurnosStates([]);
        return;
      }

      const data = await api(`/users/${userId}`);
      setTurnosStates(data.userFound?.appointments || []);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      setTurnosStates([]);
    }
  };

  const createUserApointment = async (values) => {
    await api("/appointments/schedule", {
      method: "POST",
      body: values,
    });
    await getUserAppointments();
  };

  const cancelAppointment = async (id) => {
    await api(`/appointments/cancel/${id}`, {
      method: "PUT",
    });
    const nuevoArrayTurnos = turnosState.map((turno) => {
      if (turno.id === id) {
        return { ...turno, status: "cancelled" };
      } else return turno;
    });
    setTurnosStates(nuevoArrayTurnos);
  };

  const value = {
    userId,
    LoginUser,
    logOutUser,
    getUserAppointments,
    turnosState,
    createUserApointment,
    cancelAppointment,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
