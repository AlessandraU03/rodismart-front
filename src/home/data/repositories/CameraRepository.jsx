import CameraAPI from "../datasources/CameraAPI";

const CameraRepository = {
  async getCameraUrl() {
    return await CameraAPI.fetchCameraUrl();
  },
};

export default CameraRepository;