import Swal from 'sweetalert2';

const API_URL = 'http://34.197.223.139:8080/auth';

const authApi = {
  login: async (correo, contrasena) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Correo o contraseña incorrectos',
          confirmButtonColor: '#d33'
        });
        return null;
      }

      const data = await response.json();
      if (!data || !data.token) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la respuesta',
          text: 'No se recibió un token válido.',
          confirmButtonColor: '#d33'
        });
        return null;
      }

      return {
        token: data.token,
        expiresAt: data.expires_at,
        userType: data.user_type, 
      };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'No se pudo procesar la autenticación.',
        confirmButtonColor: '#d33'
      });
      return null;
    }
  }
};

export default authApi;
