import { createContext, useContext, useState, useEffect } from 'react';
import { webSocketService } from '../../services/WebSocketService';

const CageContext = createContext();

export function CageProvider({ children }) {
  const [currentCage, setCurrentCage] = useState(null);
  const [data, setSensorData] = useState({
    temperatura: null,
    humedad: null,
    movimiento: null,
    alimento: null,
    porcentaje: 0,
    lastUpdated: null
  });


  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    cageId: null
  });

    
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // <-- Mueve esto aquí
  
    const handleSocketMessage = (message) => {
      const now = new Date();
      if (!currentCage?.idjaula || !token) return;
  
      switch(message.event) {
        case 'new_temperature':
          setSensorData(prev => ({
            ...prev,
            temperatura: message.data.temperatura,
            lastUpdated: now
          }));
          break;
          
        case 'new_humidity':
          setSensorData(prev => ({
            ...prev,
            humedad: message.data.humedad,
            lastUpdated: now
          }));
          break;
          
        case 'new_motion':
          setSensorData(prev => ({
            ...prev,
            movimiento: message.data.movimiento,
            lastUpdated: now
          }));
          break;
          
        case 'new_food':
          setSensorData(prev => ({
            ...prev,
            alimento: message.data.alimento,
            porcentaje: message.data.porcentaje,
            lastUpdated: now
          }));
          break;
          
        case 'connection_status':
          setConnectionStatus({
            isConnected: message.isConnected,
            cageId: message.cageId
          });
          break;
      }
    };
  
    const removeListener = webSocketService.addListener(handleSocketMessage);
  
    if (token && currentCage?.idjaula) {
      webSocketService.connect(token, currentCage.idjaula);
    }
  
    return () => {
      removeListener();
      webSocketService.disconnect();
    };
  }, [currentCage]);
  

  return (
    <CageContext.Provider value={{ 
      currentCage, 
      setCurrentCage, 
      data,
      connectionStatus
    }}>
      {children}
    </CageContext.Provider>
  );
}

export function useCage() {
  const context = useContext(CageContext);
  if (!context) {
    throw new Error('useCage must be used within a CageProvider');
  }
  return context;
}