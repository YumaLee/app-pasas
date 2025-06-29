import axios, { AxiosResponse, AxiosError } from 'axios';
import { RUTA } from './_base/endpoint';

class EventoService {
    async registrar(data: any): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.post(`${RUTA}/evento`, data);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : {};
        }
    }

    async actualizar(data: any): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.put(`${RUTA}/evento`, data);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : {};
        }
    }

    async payment(data: any): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.post(`${RUTA}/evento/payment`, data);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : {};
        }
    }

    async eliminar(data: any): Promise<AxiosResponse | any> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: data, // 🔹 Agrega el cuerpo aquí
            };
            const response: AxiosResponse = await axios.delete(`${RUTA}/evento`, config);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : {};
        }
    }

    async subirImagen(file: File, codigo: string): Promise<AxiosResponse | any> {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("codigo", String(codigo));

        const response = await axios.post(`${RUTA}/evento/subir-imagen`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
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

    async listarPorAnfitrion(tab: string, telefono: string, page: number): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.get(`${RUTA}/evento/paginacion?tab=${tab}&telefono=${telefono}&page=${page}`);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }

    //const res = await fetch(`/api/eventos?tab=${tab}&telefono=${telefono}&page=${page}`);

    async getByCode(code: string): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.get(`${RUTA}/evento/get?codigo=${code}`);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }
}

export default new EventoService();
