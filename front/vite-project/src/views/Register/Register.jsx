import { useFormik } from 'formik';
import { registerFormValidate } from '../../helpers/Validation'; 
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: ''
        },
        validate: registerFormValidate,
        onSubmit: (values) => {
            console.log('Formulario enviado', values);
            axios.post('http://localhost:3000/users/register', values)
                .then(res => {
                    if(res.status === 201){
                        Swal.fire({
                            icon: 'success',
                            title: "Usuario registrado con éxito"
                        })
                    }
                })
                .catch(err => {
                    const errorMessage = err.response?.data?.message || "Error desconocido en el registro";
                    if (errorMessage.includes('email')) {
                        Swal.fire({
                            icon:'error',
                            title: `Ya existe un usuario con el email: ${formik.values.email}`,
                            text: 'Intente de nuevo con otro correo'
                        });
                    } else if (errorMessage.includes('username')) {
                        Swal.fire({
                            icon:'error',
                            title: `El nombre de usuario "${formik.values.username}" ya está en uso`,
                            text: 'Intente con otro nombre de usuario'
                        });
                    } else if (errorMessage.includes('dni')) {
                        Swal.fire({
                            icon:'error',
                            title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`,
                            text: 'Verifique los datos e intente de nuevo'
                        });
                    } else {
                        Swal.fire({
                            icon:'error',
                            title: 'Error al registrar el usuario',
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
                <h2 className={styles.title}>Registro</h2>

                <label htmlFor="name" className={styles.label}>Nombre:</label>
                <input
                    id="name"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='name'
                    value={formik.values.name}
                    className={styles.input}
                />
                {formik.touched.name && formik.errors.name && (
                    <label className={styles.error}>{formik.errors.name}</label>
                )}

                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    id="email"
                    type='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    value={formik.values.email}
                    className={styles.input}
                />
                {formik.touched.email && formik.errors.email && (
                    <label className={styles.error}>{formik.errors.email}</label>
                )}

                <label htmlFor="birthdate" className={styles.label}>Fecha de nacimiento:</label>
                <input
                    id="birthdate"
                    type='date'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='birthdate'
                    value={formik.values.birthdate}
                    className={styles.input}
                />
                {formik.touched.birthdate && formik.errors.birthdate && (
                    <label className={styles.error}>{formik.errors.birthdate}</label>
                )}

                <label htmlFor="nDni" className={styles.label}>DNI:</label>
                <input
                    id="nDni"
                    type='number'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='nDni'
                    value={formik.values.nDni}
                    className={styles.input}
                />
                {formik.touched.nDni && formik.errors.nDni && (
                    <label className={styles.error}>{formik.errors.nDni}</label>
                )}

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
                {formik.touched.username && formik.errors.username && (
                    <label className={styles.error}>{formik.errors.username}</label>
                )}

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
                {formik.touched.password && formik.errors.password && (
                    <label className={styles.error}>{formik.errors.password}</label>
                )}
                
                <button
                    type='submit'
                    disabled={!formik.isValid || !formik.dirty}
                    className={styles.submitButton}
                >
                    Registrarse
                </button>
                <br></br>
                <label>
                    Ya tienes cuenta? <Link to={"/login"}> Iniciar Sesión!</Link>
                </label>
            </form>
        </div>
    );
};

export default Register;
