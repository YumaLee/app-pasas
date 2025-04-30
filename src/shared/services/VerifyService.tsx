import axios, { AxiosResponse, AxiosError } from 'axios';

interface AuthData {
  telefono: string;
  dispositivo: string;
  ip: string;
}

interface DataConfirmar {
  telefono: string;
  verificationCode: string;
}

let RUTA: string = import.meta.env.VITE_API_URL;

class VerifyService {
  async sendSms(data: AuthData): Promise<AxiosResponse | any> {
    try {

      const response: AxiosResponse = await axios.post(`${RUTA}/verify-phone`, data);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : {};
    }
  }

  async sendAttendanceSms(data: AuthData): Promise<AxiosResponse | any> {
    try {

      const response: AxiosResponse = await axios.post(`${RUTA}/verify-phone/asistencia`, data);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : {};
    }
  }

  async verificarSMs(data: DataConfirmar): Promise<AxiosResponse | any> {
    try {
      const response: AxiosResponse = await axios.post(`${RUTA}/verify-phone/confirmar`, data);
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : error;
    }
  }

  async get(): Promise<AxiosResponse | any> {
    try {
      const response: AxiosResponse = await axios.get(`${RUTA}/detraccion`, {
        headers: {
          'x-api-token': "578D876B-2B70-468F-B8D5-55C656FB1F73",  // Aquí agregas el código al header
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return (error as AxiosError).response ? (error as AxiosError).response : error;
    }
  }

}

export default new VerifyService();
