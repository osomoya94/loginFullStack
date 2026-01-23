import { useContext } from "react";
import styles from "./TurnoCards.module.css";
import { UserContext } from "../../../context/UsersContex";
import Swal from "sweetalert2";

const TurnoCards = ({ date, time, id, status }) => {
    const { cancelAppointment } = useContext(UserContext);

    const handleCancel = async () => {
        try {
            await cancelAppointment(id);
            Swal.fire({
                icon: "warning",
                color: "red",
                title: "Turno cancelado con éxito"
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error al intentar cancelar turno. Intente nuevamente"
            });
        }
    };

    return (
        <div className={styles.turnoWrapper}>
            <div className={styles.DivCaja}>
                <p><b>Turno #{id}</b></p>
                <p>Día: {date}</p>
                <p>Hora: {time}</p>
                <span className={status === "active" ? styles.statusActive : styles.statusCancelled}>
                    {status === "active" ? "Activo" : "Cancelado"}
                </span>
            </div>
            <button
                className={`${styles.cancelButton} ${status === "cancelled" ? styles.disabled : ""}`}
                onClick={handleCancel}
                disabled={status === "cancelled"}
            >
                Cancelar Turno
            </button>
        </div>
    );
};

export default TurnoCards;