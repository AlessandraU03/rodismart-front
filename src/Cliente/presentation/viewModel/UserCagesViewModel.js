import { useState, useEffect } from 'react';
import GetUserCages from '../../domain/useCases/GetUserCages';

export default class UserCagesViewModel {
  constructor() {
    this.getUserCagesUseCase = new GetUserCages();
    this.state = {
      cages: [],
      loading: true,
      error: null,
      userInfo: null
    };
    this.listeners = [];
  }

  async loadUserCages(token) {
    try {
      this.setState({ ...this.state, loading: true });
      
      // Extraer información del usuario del token
      const userInfo = this.extractUserInfo(token);
      if (!userInfo) {
        throw new Error("Token inválido o corrupto");
      }

      this.setState({ ...this.state, userInfo });

      // Obtener jaulas del usuario
      const cages = await this.getUserCagesUseCase.execute(token);
      this.setState({ 
        cages, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      this.setState({ 
        cages: [], 
        loading: false, 
        error: error.message 
      });
    }
  }

  extractUserInfo(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.user_id || payload.id || payload.sub || payload.iduser;
      
      if (!userId) return null;

      return {
        id: userId,
        name: payload.nombre || payload.name || 'Usuario',
        email: payload.correo || payload.email || 'Sin email'
      };
    } catch (e) {
      console.error("Error decodificando token:", e);
      return null;
    }
  }

  setState(newState) {
    this.state = newState;
    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}