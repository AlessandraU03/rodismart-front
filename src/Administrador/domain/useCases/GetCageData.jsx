export default class GetCageData {
    constructor(cageRepository) {
      this.repository = cageRepository;
    }
  
    async execute(idjaula, token) {
      const cageData = await this.repository.getCageById(idjaula, token);
      this.repository.subscribeToCage(idjaula, this.handleRealTimeData);
      return cageData;
    }
  
    handleRealTimeData(data) {
      console.log("Datos en tiempo real:", data);
      // Lógica para procesar datos
    }
  }