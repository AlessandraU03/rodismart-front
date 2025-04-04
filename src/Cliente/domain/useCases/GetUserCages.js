export default class GetUserCages {
    constructor(cageRepository) {
      this.cageRepository = cageRepository;
    }
  
    async execute(token) {
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }
      return this.cageRepository.getCagesByUser(token);
    }
  }