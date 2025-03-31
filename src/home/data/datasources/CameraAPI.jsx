const CameraAPI = {
    async fetchCameraUrl() {
      return "http://192.168.101.74:81/stream"; // IP fija de la ESP32-CAM
    },
  };
  
  export default CameraAPI;