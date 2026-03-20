import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../api/api";
import { registerFormValidate } from "../../helpers/Validation";
import styles from "./Register.module.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: registerFormValidate,
    onSubmit: async (values) => {
      try {
        await api("/users/register", {
          method: "POST",
          body: {
            ...values,
            nDni: Number(values.nDni),
          },
        });

        await Swal.fire({
          icon: "success",
          title: "Usuario registrado con exito",
        });

        navigate("/login");
      } catch (err) {
        const errorMessage = err?.message || "Error desconocido en el registro";

        if (errorMessage.includes("email")) {
          Swal.fire({
            icon: "error",
            title: `Ya existe un usuario con el email: ${formik.values.email}`,
            text: "Intenta de nuevo con otro correo",
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes("usuario") ||
          errorMessage.toLowerCase().includes("username")
        ) {
          Swal.fire({
            icon: "error",
            title: `El nombre de usuario "${formik.values.username}" ya esta en uso`,
            text: "Intenta con otro nombre de usuario",
          });
          return;
        }

        if (errorMessage.toLowerCase().includes("dni")) {
          Swal.fire({
            icon: "error",
            title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`,
            text: "Verifica los datos e intenta de nuevo",
          });
          return;
        }

        Swal.fire({
          icon: "error",
          title: "Error al registrar el usuario",
          text: errorMessage,
        });
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Registro</h2>

        <label htmlFor="name" className={styles.label}>
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          value={formik.values.name}
          className={styles.input}
        />
        {formik.touched.name && formik.errors.name && (
          <label className={styles.error}>{formik.errors.name}</label>
        )}

        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          value={formik.values.email}
          className={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <label className={styles.error}>{formik.errors.email}</label>
        )}

        <label htmlFor="birthdate" className={styles.label}>
          Fecha de nacimiento:
        </label>
        <input
          id="birthdate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="birthdate"
          value={formik.values.birthdate}
          className={styles.input}
        />
        {formik.touched.birthdate && formik.errors.birthdate && (
          <label className={styles.error}>{formik.errors.birthdate}</label>
        )}

        <label htmlFor="nDni" className={styles.label}>
          DNI:
        </label>
        <input
          id="nDni"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="nDni"
          value={formik.values.nDni}
          className={styles.input}
        />
        {formik.touched.nDni && formik.errors.nDni && (
          <label className={styles.error}>{formik.errors.nDni}</label>
        )}

        <label htmlFor="username" className={styles.label}>
          Usuario:
        </label>
        <input
          id="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          value={formik.values.username}
          className={styles.input}
        />
        {formik.touched.username && formik.errors.username && (
          <label className={styles.error}>{formik.errors.username}</label>
        )}

        <label htmlFor="password" className={styles.label}>
          Contrasena:
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            value={formik.values.password}
            className={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.toggleButton}
          >
            {showPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <label className={styles.error}>{formik.errors.password}</label>
        )}

        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className={styles.submitButton}
        >
          Registrarse
        </button>
        <br></br>
        <label>
          Ya tienes cuenta? <Link to={"/login"}> Iniciar Sesion!</Link>
        </label>
      </form>
    </div>
  );
};

export default Register;
