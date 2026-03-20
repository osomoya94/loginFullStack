import { useEffect } from "react";
import { useHomeContext } from "../../../context/HomeContex";
import styles from "./Home.module.css"

const Home = () => {
    const { userName, getUserAppointments } = useHomeContext();

    useEffect(() => {
        getUserAppointments();
    }, []);

    return (
    <div className={styles.divPrincipal}>
        <h1>Hola, {userName || "usuario"}</h1>
        <h2>Gracias por elegir Your Style</h2>
    </div>
    );
};

export default Home;
