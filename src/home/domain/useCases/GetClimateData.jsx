import ClimateRepository from "../../data/repositories/ClimateRepository";

async function GetClimateData() {
  return await ClimateRepository.getClimateData();
}

export default GetClimateData;