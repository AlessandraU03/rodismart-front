import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useCage } from "../../../core/context/CageContext";
import CageRepository from "../../../Administrador/data/repositories/CageRepository";
import Header from "../../../home/presentation/views/HeaderView";

const UserCagesView = () => {
    const token = sessionStorage.getItem("token");
    const [cages, setCages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const { setCurrentCage } = useCage();

  const columns = [
    {
      header: "ID Jaula",
      accessorKey: "idjaula",
    },
    {
      header: "Nombre del Hámster",
      accessorKey: "nombre_hamster",
    },
    {
      header: "Estado",
      accessorKey: "estado",
      cell: ({ getValue }) => {
        const estado = getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${
            estado === 'activo' ? 'bg-green-100 text-green-800' : 
            estado === 'inactivo' ? 'bg-red-100 text-red-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {estado}
          </span>
        );
      }
    },
    {
      header: "Fecha de Creación",
      accessorKey: "fecha_creacion",
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString()
    },
  ];

  const handleCageClick = (cage) => {
    setCurrentCage(cage);
    navigate(`/dashboard/${cage.idjaula}`);
  };

  useEffect(() => {
    if (!token) {
      setError("No se encontró token de autenticación");
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.user_id || payload.id || payload.sub || payload.iduser;
      
      if (!userId) throw new Error("Token no contiene ID de usuario");

      setUserInfo({
        id: userId,
        name: payload.nombre || payload.name || 'Usuario',
        email: payload.correo || payload.email || 'Sin email'
      });
    } catch (e) {
      console.error("Error decodificando token:", e);
      setError("Token inválido o corrupto");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token || !userInfo?.id) return;

    const loadCages = async () => {
      try {
        setLoading(true);
        const data = await CageRepository.getCagesByUser(token);
        setCages(Array.isArray(data) ? data : data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error obteniendo jaulas:", err);
        setError(err.message || "Error al cargar las jaulas");
        setCages([]);
      } finally {
        setLoading(false);
      }
    };

    loadCages();
  }, [token, userInfo]);

  const table = useReactTable({
    data: cages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Header></Header>
      <div className="bg-[#FFE6C8] rounded-lg shadow-md p-10 mt-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Mis Jaulas</h2>
        
        {userInfo && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Información del Usuario</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID Usuario</p>
                <p className="font-medium">{userInfo.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && cages.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No tienes jaulas registradas.</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && cages.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id} 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCageClick(row.original)} // Maneja el clic en la fila
                  >
                    {row.getVisibleCells().map(cell => (
                      <td 
                        key={cell.id} 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCagesView;