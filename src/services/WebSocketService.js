export class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = [];
        this.eventHandlers = {
          'new_temperature': this.handleTemperature.bind(this),
          'new_humidity': this.handleHumidity.bind(this),
          'new_motion': this.handleMotion.bind(this),
          'new_food': this.handleFood.bind(this),
          'connection_status': this.handleConnectionStatus.bind(this)
        };
      }
  
    connect(token, cageId) {
      if (this.socket) this.disconnect();
  
      this.currentCageId = cageId;
      const wsUrl = `ws://34.197.223.139:8080/ws/connect?token=${token}&cage_id=${cageId}`;
      this.socket = new WebSocket(wsUrl);
  
      this.socket.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyListeners({
          event: 'connection_status',
          isConnected: true,
          cageId: this.currentCageId
        });
      };
  
      this.socket.onmessage = (event) => {
        try {
          const messages = this.parseMessages(event.data);
          messages.forEach(msg => this.processMessage(msg));
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handleDisconnection();
      };
  
      this.socket.onclose = () => this.handleDisconnection();
    }
  
    parseMessages(data) {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        try {
          const fixedData = data.replace(/}{/g, '},{');
          return JSON.parse(`[${fixedData}]`);
        } catch (error) {
          console.error('Error parsing messages:', error);
          return [];
        }
      }
    }
  
    processMessage(message) {
      if (!message?.event) {
        console.warn('Invalid message format:', message);
        return;
      }
  
      const normalized = this.normalizeData(message);
      this.notifyListeners(normalized);
    }
  
    normalizeData(message) {
      const data = {
        cage_id: message.cage_id,
        timestamp: message.timestamp || Date.now(),
        idhamster: message.data?.idhamster || message.cage_id
      };
  
      switch(message.event) {
        case 'new_temperature':
          return {
            event: message.event,
            data: {
              ...data,
              temperatura: parseFloat(message.data?.temperatura) || null
            }
          };
  
        case 'new_humidity':
          return {
            event: message.event,
            data: {
              ...data,
              humedad: parseInt(message.data?.humedad) || null
            }
          };
  
        case 'new_motion':
          return {
            event: message.event,
            data: {
              ...data,
              movimiento: Boolean(message.data?.movimiento)
            }
          };
  
        case 'new_food':
          return {
            event: message.event,
            data: {
              ...data,
              alimento: message.data?.alimento === 1,
              porcentaje: parseInt(message.data?.porcentaje) || 0
            }
          };
  
        default:
          return message;
      }
    }

    handleMessage(rawMessage) {
        try {
          const messages = this.parseMessages(rawMessage);
          messages.forEach(message => {
            const handler = this.eventHandlers[message.event];
            if (handler) {
              handler(message);
            } else {
              console.warn(`Evento no manejado: ${message.event}`, message);
            }
          });
        } catch (error) {
          console.error('Error procesando mensaje:', error);
        }
      }

      handleTemperature(message) {
        const normalized = {
          cage_id: message.cage_id,
          temperatura: parseFloat(message.data?.temperatura) || null,
          idhamster: message.data?.idhamster || message.cage_id,
          timestamp: message.timestamp || Date.now()
        };
        this.notifyListeners({
          event: 'new_temperature',
          data: normalized
        });
      }
    
      handleHumidity(message) {
        const normalized = {
          cage_id: message.cage_id,
          humedad: parseInt(message.data?.humedad) || null,
          idhamster: message.data?.idhamster || message.cage_id,
          timestamp: message.timestamp || Date.now()
        };
        this.notifyListeners({
          event: 'new_humidity',
          data: normalized
        });
      }
    
      handleMotion(message) {
        const normalized = {
          cage_id: message.cage_id,
          movimiento: Boolean(message.data?.movimiento),
          idhamster: message.data?.idhamster || message.cage_id,
          timestamp: message.timestamp || Date.now()
        };
        this.notifyListeners({
          event: 'new_motion',
          data: normalized
        });
      }
    
      handleFood(message) {
        const normalized = {
          cage_id: message.cage_id,
          alimento: message.data?.alimento === 1,
          porcentaje: parseInt(message.data?.porcentaje) || 0,
          idhamster: message.data?.idhamster || message.cage_id,
          timestamp: message.timestamp || Date.now()
        };
        this.notifyListeners({
          event: 'new_food',
          data: normalized
        });
      }
    
      handleConnectionStatus(message) {
        this.notifyListeners(message);
      }
  
    notifyListeners(message) {
      this.listeners.forEach(listener => {
        try {
          listener(message);
        } catch (error) {
          console.error('Listener error:', error);
        }
      });
    }
  
    handleDisconnection() {
      if (this.isConnected) {
        this.isConnected = false;
        this.notifyListeners({
          event: 'connection_status',
          isConnected: false,
          cageId: this.currentCageId
        });
  
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => {
            const token = sessionStorage.getItem('token');
            if (token && this.currentCageId) this.connect(token, this.currentCageId);
          }, this.reconnectDelay);
        }
      }
    }
  
    addListener(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
      }
    }
  }
  
  export const webSocketService = new WebSocketService();