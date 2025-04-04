const API_URL = 'http://34.197.223.139:8080/auth';

const authApi = {
  login: async (correo, contrasena) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    return await response.json();
  }
};

export default authApi;
