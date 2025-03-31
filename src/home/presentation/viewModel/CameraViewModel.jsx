import { useState } from "react";
import GetCameraUrl from "../../domain/useCases/GetCameraUrl";

function CameraViewModel() {
  const [cameraUrl, setCameraUrl] = useState("");

  async function fetchCameraUrl() {
    const url = await GetCameraUrl();
    setCameraUrl(url);
  }

  const refreshStream = () => {
    setCameraUrl("");
    setTimeout(() => {
      fetchCameraUrl();
    }, 100);
  };

  return { cameraUrl, refreshStream, fetchCameraUrl };
}

export default CameraViewModel;
