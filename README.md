# LoginFullStack Bootcamp Henry

Aplicación **full stack** para registro, autenticación y gestión de turnos, desarrollada como proyecto práctico para reforzar conceptos de desarrollo web moderno con **React, Node.js, TypeScript, Express, TypeORM y PostgreSQL**.

El proyecto permite que un usuario se registre, inicie sesión, visualice sus turnos, cree nuevos turnos y cancele reservas existentes, aplicando validaciones tanto en frontend como en backend.


## Sobre el proyecto

Este proyecto fue desarrollado con enfoque en una arquitectura separada de **frontend y backend**, simulando un flujo real de una aplicación de gestión de usuarios y turnos.

El objetivo principal fue practicar:

- autenticación de usuarios
- manejo de estado global
- consumo de APIs
- persistencia de datos en PostgreSQL
- validaciones de negocio en backend
- organización de código escalable



## Funcionalidades principales

- Registro de usuarios
- Inicio de sesión
- Persistencia de sesión con `localStorage`
- Protección de rutas en frontend
- Visualización de turnos del usuario autenticado
- Creación de turnos
- Cancelación de turnos
- Página de error para rutas inexistentes
- Validaciones de negocio para evitar turnos inválidos

---

##  Reglas de negocio implementadas

Al momento de crear turnos, el sistema valida que:

- la fecha no sea pasada
- exista al menos **24 horas de anticipación**
- no se permitan turnos en **fin de semana**
- el turno esté dentro del **horario habilitado**
- no exista un turno activo duplicado

Estas validaciones fueron implementadas en el backend para asegurar integridad y consistencia en los datos.

---

## Tecnologías utilizadas

### Frontend
- React
- Vite
- React Router DOM
- Context API
- JavaScript
- CSS

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Morgan
- CORS
- dotenv

---

## 🧱 Arquitectura del proyecto

```bash
loginFullStack/
├── back/
└── front/
