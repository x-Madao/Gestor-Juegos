# 📚 Gestor de Juegos

Aplicacion web para gestionar una lista de videojuegos mediante operaciones CRUD, filtros, ordenamiento y paginacion.
Proyecto realizado como practica de **frontend + backend**, enfocada en la logica, la estructura del codigo y la experiencia de usuario.

---


## 🚀 Funcionalidades

- Crear, editar y eliminar juegos

- Listado paginado

- Filtros por genero y estado

- Ordenamiento dinamico (sin boton, al seleccionar opcion)

- Validaciones de formulario con mensajes claros

- Mensajes de exito (crear / editar / borrar)

- Estados vacios cuando no hay juegos cargados

- Deshabilitacion de filtros y ordenamiento cuando no existen datos

- Diseño responsive (adaptado a dispositivos moviles)

---


## 🛠️ Tecnologías usadas

### Fronted

- HTML

- CSS 

- JavaScript (Vanilla)

### Backend

- Java

- Spring Boot

- Spring Data JPA

- API REST

- Maven

### Base de datos

- MySQL

---


## 🧠 Decisiones importantes

- El ordenamiento se realiza del lado del backend para asegurar consistencia entre paginas.

- Los mensajes de error y exito no usan alertas, sino componentes visuales.

- Cuando no hay juegos registrados:

  - Se muestra un estado visual informativo

  - Se bloquean los filtros y el ordenamiento

- El proyecto prioriza claridad del código antes que librerias externas.

---


## ▶️ Como ejecutar el proyecto

Levantar el backend:

Ejecutar el proyecto Spring Boot con mvn spring-boot:run

El backend corre en http://localhost:8080

Abrir el frontend:

Abrir el archivo index.html en el navegador

No requiere build ni dependencias


## ✍️ Autor

Proyecto realizado por Nicolas Cao
Estudiante de programación
