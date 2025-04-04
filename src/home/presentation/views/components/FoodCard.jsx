function FoodStatusCard({ porcentaje }) {
    return (
      <div className="p-4 border rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Estado de Comida</h3>
        <p>Nivel de comida: {porcentaje ?? "No disponible"}%</p>
      </div>
    );
  }
  
  export default FoodStatusCard;
  