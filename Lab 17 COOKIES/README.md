# Laboratorio: Sesiones y Cookies

## Ataque OWASP Top 10: Cross-Site Scripting (XSS)

El Cross-Site Scripting, o XSS, es un ataque en el que una persona logra insertar codigo JavaScript malicioso dentro de una pagina web. Esto puede pasar cuando una aplicacion muestra datos escritos por usuarios sin validarlos o escaparlos correctamente.

Si el ataque funciona, el navegador de otro usuario puede ejecutar ese codigo. Esto podria permitir robar cookies, modificar el contenido de la pagina, redirigir al usuario o realizar acciones no autorizadas.

### Formas de prevenirlo

- Validar y sanitizar los datos que ingresan los usuarios.
- Escapar el contenido antes de mostrarlo en HTML.
- Usar cookies con la propiedad HttpOnly.
- Evitar insertar datos del usuario directamente con innerHTML.
- No confiar solo en validaciones del lado del cliente.
- Usar buenas practicas de seguridad en sesiones y cookies.

## Posibles dependencias de CORS en el proyecto

En este proyecto, CORS podria ser necesario si la interfaz web, el servidor y los servicios externos se publican en direcciones distintas. Esto puede pasar, por ejemplo, si el frontend y el backend están en dominios diferentes, o si se usan servicios externos para almacenar documentos del expediente o consultar listas de riesgo. En esos casos, sera necesario permitir la comunicacion solo entre los origenes autorizados para que el sistema funcione correctamente y de forma segura.