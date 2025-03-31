import axios, { AxiosResponse, AxiosError } from 'axios';
import { RUTA } from './_base/endpoint';

class PexelsService {

    async getImages(query: string, per_page: number): Promise<AxiosResponse | any> {
        try {
            //https://localhost:44317/pexels?query=Ocean&per_page=10

            const response: AxiosResponse = await axios.get(`${RUTA}/pexels?query=${query}&per_page=${per_page}`);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }
}

export default new PexelsService();
