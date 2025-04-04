import CageRepository from "../../data/repositories/CageRepository";

const GetCageById = async (token) => {
  return await CageRepository.getCageById(idjaula, token);
};

export default GetCageById;
