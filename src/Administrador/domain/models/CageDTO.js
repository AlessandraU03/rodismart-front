export default class Cage {
    constructor({ idjaula, nombre_hamster, estado, fecha_creacion }) {
      this.id = idjaula;
      this.hamsterName = nombre_hamster;
      this.status = estado;
      this.createdAt = new Date(fecha_creacion);
      this.metrics = {
        humidity: 0,
        temperature: 0,
        food: 0,
        motion: false
      };
    }
  
    updateMetrics(metrics) {
      this.metrics = { ...this.metrics, ...metrics };
    }
  }