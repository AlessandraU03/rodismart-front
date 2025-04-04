import CageRepository from "../../data/repositories/CageRepository";

const GetAllCages = async (token) => {
  return await CageRepository.getAllCages(token);
};

export default GetAllCages;
