export function GetTemperaturaUseCase(temperaturaRepository) {
    this.execute = async function () {
      return await temperaturaRepository.getTemperatura();
    };
  }
  