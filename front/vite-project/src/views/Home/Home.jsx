import { useEffect } from "react";
import { useHomeContext } from "../../../context/HomeContex";
import styles from "./Home.module.css"

const Home = () => {
    const { userName, getUserAppointments } = useHomeContext();

    useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
        const userId = JSON.parse(storedUser);
        getUserAppointments(userId);
    }
    }, []);

    return (
    <div className={styles.divPrincipal}>
        <h1>Hola, {userName}</h1>
        <h2>Gracias por elegir Your Style</h2>
    </div>
    );
};

export default Home;