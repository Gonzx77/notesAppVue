Figma: https://www.figma.com/design/eDkwXETFloGXf2c4JxHYsW/Notes-App-UI-(Community)?node-id=0-1&node-type=canvas&t=xQqrFwsGQNBHP4Wg-0




| **Funcionalidad**                    | **Método HTTP** | **Endpoint**              | **Descripción**                                              |
| ------------------------------------ | --------------- | ------------------------- | ------------------------------------------------------------ |
| Crear Usuario                        | POST            | ``              | Crea un nuevo usuario y devuelve un token JWT.               |
| Iniciar Sesión                       | POST            | ``        | Permite a un usuario iniciar sesión y obtener un token JWT.  |
| **Cerrar Sesión (opcional)** | POST            | ``      | Permite a un usuario cerrar sesión.                          |
| Crear Nota                           | POST            | `/notes/update`       | Crea una nueva nota.                                         |
| Obtener Todas las Notas              | GET             | `/notes`              | Obtiene una lista de todas las notas.                        |
| Obtener Nota Específica              | GET             | `/notes?id`     | Obtiene los detalles de una nota específica.                 |
| Actualizar Nota                      | PUT             | `/notes/update`   | Actualiza una nota existente.                                |
| Eliminar Nota                        | DELETE          | `/notes/delete`   | Elimina una nota específica.                                 |
| Buscar Notas                         | GET             | `/notes/search`       | Busca notas por título o contenido.                          |
| Obtener Historial de Cambios de Nota | GET             | `` | Obtiene el historial de cambios de una nota específica. **(solo admin)** |
| **Crear Nueva Versión de Nota**      | POST            | `` | Guarda una nueva versión de una nota. **(Sin interfaz gráfica)** |
| **Actualizar Usuario (opcional)**     | PUT             | ``         | Actualiza la información del usuario específico **(solo admin).** |
| **Eliminar Usuario (opcional)**                 | DELETE          | ``         | Elimina un usuario específico **(solo admin).**              |