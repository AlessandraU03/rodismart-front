import { api } from "../config/api";

export function TemperaturaRepository() {
    this.getTemperatura = async function () {
      return await api.getTemperatura();
    };
  }