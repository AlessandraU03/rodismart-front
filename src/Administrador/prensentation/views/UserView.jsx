import React, { useState, useEffect } from "react";
import UserRepository from "../../data/repositories/UserRepository";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await UserRepository.getAllUsers();
      setUsers(usersData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Usuarios Registrados</h2>

      {loading ? (
        <p className="text-center">Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.iduser} className="text-center">
                <td className="border p-2">{user.idusuario}</td>
                <td className="border p-2">{user.nombre}</td>
                <td className="border p-2">{user.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersView;
