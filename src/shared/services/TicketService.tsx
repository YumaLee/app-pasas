import axios, { AxiosResponse, AxiosError } from 'axios';
import { RUTA } from './_base/endpoint';

class TicketService {


    async getListTicket(code: string, id: number): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.get(`${RUTA}/ticket/list?codigo=${code}&id=${id}`);
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }

    async getFilePdf(code: string, id: number, invitado: boolean): Promise<AxiosResponse | any> {
        try {

            const response: AxiosResponse = await axios.get(`${RUTA}/ticket/pdf?codigo=${code}&id=${id}&invitado=${invitado}`,{ responseType: 'blob', });
            return response;
        } catch (error) {
            console.error(error);
            return (error as AxiosError).response ? (error as AxiosError).response : error;
        }
    }
}

export default new TicketService();
