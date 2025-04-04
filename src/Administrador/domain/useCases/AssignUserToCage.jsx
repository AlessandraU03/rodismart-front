import CageRepository from "../../data/repositories/CageRepository";

const AssignUserToCage = async (idjaula, idusuario, nombre_hamster, token) => {
  return await CageRepository.updateCage(idjaula, idusuario, nombre_hamster, token);
};

export default AssignUserToCage;
