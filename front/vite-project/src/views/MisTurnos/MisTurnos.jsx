import { useContext, useEffect} from "react";
import TurnoCards from "../../components/DeTurnos/TurnoCards"; 
import styles from "./MisTurnos.module.css";
import { UserContext } from "../../../context/UsersContex";

const MisTurnos = () => {
    const{getUserAppointments,turnosState}= useContext(UserContext);

    useEffect(() => {
        getUserAppointments()
    }, []);

    return (
        <>
            <h1 className={styles.TextTunos}>Mis Turnos</h1>
            <div className={styles.contenedorTurnos}>
                {
                    turnosState && turnosState.length > 0 
                    ? turnosState.map((turno) => { 
                        return <TurnoCards key={turno.id} id={turno.id} date={turno.date} time={turno.time} status={turno.status} />;
                    }) 
                    : (<h1>No hay citas para mostrar</h1>)
                }
            </div>
        </>
    );
};

export default MisTurnos; 