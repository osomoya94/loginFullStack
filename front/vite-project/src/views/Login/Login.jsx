import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { loginFormValidate } from '../../helpers/Validation';
import Swal from "sweetalert2";
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UsersContex';

const Login = () => {
    const {LoginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: loginFormValidate,
        onSubmit: (values) => {
            LoginUser(values)
                .then(res => {
                    if(res.status === 200){
                        Swal.fire({
                            icon: 'success',
                            title: "Usuario logueado correctamente"
                        })
                        navigate("/")
                    }
                })
                .catch(err => {
                    const errorMessage = err.response?.data?.message || "Error desconocido en el registro";
                    if(errorMessage.includes('username')){
                        Swal.fire({
                            icon:'error',
                            title:'El usuario o contraseña equivocado',
                            text: 'Verifique los datos e intente de nuevo'
                        });
                    }else if(errorMessage.includes('password')){
                        Swal.fire({
                            icon:'error',
                            title:'El usuario o contraseña equivocado',
                            text: 'Verifique los datos e intente de nuevo'
                        });
                    }else {
                        Swal.fire({
                            icon:'error',
                            title: 'Error al iniciar sesion',
                            text: errorMessage
                        });
                    }
            });
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Iniciar Sesión</h2>

                <label htmlFor="username" className={styles.label}>Usuario:</label>
                <input
                    id="username"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='username'
                    value={formik.values.username}
                    className={styles.input}
                />
                {formik.touched.username && formik.errors.username ? (
                    <label className={styles.error}>{formik.errors.username}</label>
                ) : null}

                <label htmlFor="password" className={styles.label}>Contraseña:</label>
                <div className={styles.passwordContainer}>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='password'
                        value={formik.values.password}
                        className={styles.input}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleButton}
                    >
                        {showPassword ? '👁️' : '🔒'}
                    </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <label className={styles.error}>{formik.errors.password}</label>
                ) : null}
                
                <button
                    type='submit'
                    disabled={!formik.isValid || !formik.dirty}
                    className={styles.submitButton}
                >
                    Entrar
                </button>
                <br></br>
                <label>
                    Aun no tienes una cuenta? <Link to={"/register"}> Registrate!</Link>
                </label>
            </form>
        </div>
    );
};

export default Login;
