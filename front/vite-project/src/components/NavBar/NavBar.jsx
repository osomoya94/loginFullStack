import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../../context/UsersContex";

const NavBar = () => {
    const { logOutUser} =useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () =>{
        logOutUser()
        navigate("/login")
        Swal.fire({
            icon:"warning",
            title:"Tu sesion fue cerrada con exito"
        })
    }

    return (
        <>
            <nav className={styles.nav}>   
                <div className={styles.divPrincipal}>
                    <div>
                        <li className={styles.logo}>
                            <img src='/images/logo.jpg' alt="Logo" className={styles.imgLogo }/>
                        </li>
                    </div>

                    <div className={styles.segundoDiv}>

                        <li className={styles.liDeNav}>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className={styles.liDeNav}>
                            <Link to={"/about"}>Acerca de Nosotros</Link>
                        </li>
                        <li className={styles.liDeNav}>
                            <Link to={"/crearturnos"}>Agendar Turno</Link>
                        </li>
                        <li className={styles.liDeNav}>
                            <Link to={"/misturnos"}>Mis Turnos</Link>
                        </li>
                        
                        <button className={styles.buttonNav} onClick={handleLogOut}>Cerrar sesion</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
