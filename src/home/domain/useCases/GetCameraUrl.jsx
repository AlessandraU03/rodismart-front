import CameraRepository from "../../data/repositories/CameraRepository";

async function GetCameraUrl() {
  return await CameraRepository.getCameraUrl();
}

export default GetCameraUrl;