# Validación de autenticación

Ejecutar desde `ecoems-app-frontend` con Node.js 24 (versión usada en la validación):

```sh
npm test
npm run lint
npm run build
```

Las pruebas ejecutan el callback y el proxy reales con Supabase y HTTP simulados.
No crean cuentas, perfiles ni sesiones externas. Cubren PKCE, confirmación por
OTP, nombres de Google y correo, recuperación ante fallos del backend,
redirecciones de registro y propagación de cookies renovadas.

`npm test` usa las APIs experimentales VM Modules y stripTypeScriptTypes de Node;
los avisos de estas APIs son esperados. La compilación necesita acceso a Google
Fonts para descargar Outfit y las variables de entorno del proyecto.

Antes de publicar, comprobar en el entorno de destino con cuentas de prueba:

- Google nuevo: `/login` o `/signup` → `/auth/callback` → registro inicial → inicio.
- Google existente con registro completo: acceso directo a `/home`.
- Registro por correo: confirmación y creación de perfil; acceso posterior con contraseña.
- Perfil inexistente: completar registro crea el perfil y reintenta guardarlo.
- Completar registro muestra la pantalla final y actualiza nombre y avatar.
- Iniciar y recuperar un examen conserva el tiempo restante de la sesión.

El proveedor Google debe estar habilitado en Supabase y la URL del frontend
`/auth/callback` debe estar autorizada para cada entorno. Estas pruebas no
verifican la configuración externa ni sustituyen el recorrido con una cuenta real.
