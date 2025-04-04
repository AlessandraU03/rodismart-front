import { useState, useEffect } from "react";
import CageViewModel from "../viewModels/CageViewModel";
import CageCard from "./CageCard";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import UserRepository from "../../data/repositories/UserRepository";

const CageView = () => {
  const token = sessionStorage.getItem("token"); // Obtener el token desde sessionStorage
  
  if (!token) {
    console.error("No se encontró el token de autenticación.");
    return <div>No se encontró el token de autenticación.</div>;
  }

  const { cages, loading, error, updateCage } = CageViewModel(token); // Ahora obtenemos el updateCage de nuestro ViewModel
  const [users, setUsers] = useState([]); // Usuarios disponibles
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
  const [selectedCage, setSelectedCage] = useState(null); // Jaula seleccionada
  const [nombre_hamster, setNombre_hamster] = useState(""); // Nombre del hámster

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UserRepository.getAllUsers(token);
      console.log("Usuarios después del mapeo:", data);
      setUsers(data);
    };
    fetchUsers();
  }, [token]);
  

  const columns = [
    { accessorKey: "idjaula", header: "ID Jaula" },
    { accessorKey: "idusuario", header: "ID Usuario" },
    { accessorKey: "nombre_hamster", header: "Nombre del Hámster" },
  ];

  const table = useReactTable({
    data: cages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCageClick = (cage) => {
    setSelectedCage(cage);
    setNombre_hamster(cage.nombre_hamster); // Cargar el nombre del hámster al seleccionar la jaula
  };

  const handleUserSelect = (e) => {
    const idusuario = e.target.value;
    console.log("Usuario seleccionado:", idusuario); // Para depuración
    setSelectedUser(idusuario ? parseInt(idusuario, 10) : null);
  };
  

  const handleSubmit = async () => {
    if (!selectedUser || !selectedCage) {
      alert("Por favor selecciona un usuario y una jaula");
      return;
    }
  
    console.log("Datos a enviar - ID Usuario:", selectedUser);
    console.log("Tipo de dato del ID:", typeof selectedUser);
  
    try {
      const response = await updateCage(
        selectedCage.idjaula,
        selectedUser,  // Aquí se envía el ID correctamente
        nombre_hamster
      );
  
      // Resto del código...
    } catch (error) {
      console.error("Error completo:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Jaulas Registradas</h2>

      {loading ? (
        <p className="text-center">Cargando jaulas...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : cages.length === 0 ? (
        <p className="text-center text-gray-500">No hay jaulas registradas.</p>
      ) : (
        <CageCard>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border p-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.idjaula}
                  className="text-center cursor-pointer"
                  onClick={() => handleCageClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {selectedCage && (
            <div className="mt-4">
              <label htmlFor="user-select" className="block text-sm font-medium">
                Selecciona un usuario para esta jaula
              </label>
              <select
  id="user-select"
  value={selectedUser || ""}
  onChange={handleUserSelect}
  className="border p-2 mt-2 w-full"
>
  <option value="">Seleccionar usuario</option>
  {users.map((user) => (
    <option key={user.idusuario} value={user.idusuario}>
      {user.nombre} (ID: {user.idusuario})
    </option>
  ))}
</select>
              <label htmlFor="hamster-name" className="block text-sm font-medium mt-2">
                Nombre del Hámster
              </label>
              <input
                type="text"
                id="hamster-name"
                value={nombre_hamster}
                onChange={(e) => setNombre_hamster(e.target.value)}
                className="border p-2 mt-2 w-full"
                placeholder="Nuevo nombre del hámster"
              />

              <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white">
                Asignar usuario a la jaula
              </button>
            </div>
          )}
        </CageCard>
      )}
    </div>
  );
};

export default CageView;
