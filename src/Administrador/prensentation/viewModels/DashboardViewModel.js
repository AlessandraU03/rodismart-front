export default class DashboardViewModel {
    constructor(cageRepository) {
      this.repository = cageRepository;
      this.cage = null;
      this.metrics = {
        humidity: 0,
        temperature: 0,
        food: 0,
        motion: false
      };
      this.listeners = [];
    }
  
    async loadCageData(idjaula, token) {
      this.cage = await this.repository.getCageById(idjaula, token);
      this.repository.subscribeToCage(idjaula, this.updateMetrics.bind(this));
    }
  
    updateMetrics(eventType, data) {
      const metric = eventType.split('_')[1]; // new_humidity -> humidity
      this.metrics[metric] = data[metric] ?? data[metric === 'motion' ? 'movimiento' : metric];
      this.notifyListeners();
    }
  
    addListener(listener) {
      this.listeners.push(listener);
    }
  
    notifyListeners() {
      this.listeners.forEach(listener => listener());
    }
  }