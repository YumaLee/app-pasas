import axios, { AxiosResponse, AxiosError } from 'axios';
import { RUTA } from './_base/endpoint';

class AsistenciaService {
    async registrar(data: any): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.post(`${RUTA}/asistencia`, data);
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

        const response = await axios.post(`${RUTA}/asistencia/subir-imagen`, formData, config)
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

    async getByCode(code: string): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.get(`${RUTA}/asistencia/${code}`);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }
}

export default new AsistenciaService();
