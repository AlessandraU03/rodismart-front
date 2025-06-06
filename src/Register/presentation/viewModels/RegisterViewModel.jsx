import { useState } from "react";
import Swal from 'sweetalert2';
import registerUserUseCase from "../../domain/useCases/RegisterUser";

function useRegisterViewModel() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    tipo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUserUseCase(formData);
      Swal.fire({
        title: 'Éxito',
        text: 'Usuario registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      setFormData({
        nombre: "",
        correo: "",
        contrasena: "",
        tipo: "",
      });
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: 'Error',
        text: 'Error al registrar usuario: ' + err.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
}

export default useRegisterViewModel;