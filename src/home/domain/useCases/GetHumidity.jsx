import ClimateRepository from "../../data/repositories/ClimateRepository";

async function GetHumidity() {
  return await ClimateRepository.getHumidity();
}

export default GetHumidity;
