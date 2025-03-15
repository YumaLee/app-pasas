import axios, { AxiosResponse, AxiosError } from 'axios';
import { RUTA } from './_base/endpoint';

interface AuthData {
  nombre: string,
  apellido: string,
  correo: string,
  foto: string,
  telefono: string;
}

class UserService {
  async updateAuth(data: AuthData): Promise<AxiosResponse | any> {
    try {
      const response: AxiosResponse = await axios.put(`${RUTA}/usuario`, data);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : {};
    }
  }


  async subirImagen(file: any): Promise<AxiosResponse | any> {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const response = await axios.post(`${RUTA}/usuario/subir-imagen`, formData, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return (error as AxiosError).response ? (error as AxiosError).response : {};
      });
    return response;
  };


  //QUERIES

  async obtenerPorTelefono(data: any): Promise<AxiosResponse | any> {
    try {
      const response: AxiosResponse = await axios.get(`${RUTA}/usuario/${data.id}/${data.telefono}`);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : error;
    }
  }


}

export default new UserService();
