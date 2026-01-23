// src/views/CrearTurnos/CrearTurnos.jsx
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import styles from './CrearTurnos.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/UsersContex';

const CrearTurnos = () => {
    const userId = parseInt(localStorage.getItem('userId'));

    const {createUserApointment}=useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            date: '',
            time: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.date) errors.date = 'Fecha requerida';
            if (!values.time) errors.time = 'Hora requerida';
            return errors;
        },
        onSubmit: async (values) => {
            const payload = {
            ...values,
            userId: userId
        };
        try {
        
            await createUserApointment(payload); 
            Swal.fire({
            icon: 'success',
            title: 'Turno creado con éxito'
        });
        } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error al crear turno',
            text: err.response?.data?.message || 'Error desconocido'
            });
        } finally {
        formik.resetForm()
        }
    }
    });

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Agendar un Turno</h2>

                <label htmlFor="date" className={styles.label}>Fecha:</label>
                <input
                    id="date"
                    type='date'
                    name='date'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className={styles.input}
                />
                {formik.touched.date && formik.errors.date && (
                    <label className={styles.error}>{formik.errors.date}</label>
                )}

                <label htmlFor="time" className={styles.label}>Hora:</label>
                <input
                    id="time"
                    type='time'
                    name='time'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                    className={styles.input}
                />
                {formik.touched.time && formik.errors.time && (
                    <label className={styles.error}>{formik.errors.time}</label>
                )}

                <button
                    type='submit'
                    disabled={!formik.isValid || !formik.dirty}
                    className={styles.submitButton}
                >
                    Crear Turno
                </button>
            </form>
        </div>
    );
};

export default CrearTurnos;
