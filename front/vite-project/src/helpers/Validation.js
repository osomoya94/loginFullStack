export const registerFormValidate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'El nombre es requerido';
    } else if (values.name.length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!values.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Dirección de email inválida';
    }

    if (!values.birthdate) {
        errors.birthdate = 'La fecha de nacimiento es requerida';
    } else {
        const today = new Date();
        const birthDate = new Date(values.birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            errors.birthdate = 'Debes ser mayor de 18 años para registrarte';
        }
    }

    if (!values.nDni) {
        errors.nDni = 'El DNI es requerido';
    } else if (!/^\d{7,8}$/.test(values.nDni)) {
        errors.nDni = 'El DNI debe tener 7 u 8 dígitos numéricos';
    }

    if (!values.username) {
        errors.username = 'El usuario es requerido';
    }

    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
};


export const loginFormValidate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'El usuario es requerido';
    }

    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    }

    return errors;
};