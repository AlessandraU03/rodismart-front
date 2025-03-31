import ClimateRepository from "../../data/repositories/ClimateRepository";

async function GetTemperature() {
  return await ClimateRepository.getTemperature();
}

export default GetTemperature;