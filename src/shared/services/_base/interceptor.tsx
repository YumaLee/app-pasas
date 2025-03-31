import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import { RUTA } from './endpoint';
import auth from '../../utility/auth';


const ignoreInterceptions: string[] = [
    `${RUTA}/verify-phone`,
    `${RUTA}/verify-phone/confirmar`,
    `${RUTA}/evento/get`,
];

interface User {
    id: number;
    userName: string;
    userGroup: string;
    session: string;
    mainGroup: string;
    integrationCode: string | null;
    telefono: string;
    nombre: string;
    expiry: number;

}

const setupInterceptors = () => {
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        if (!config.url) return config;
        // Si la URL está en la lista de excepciones, no se modifica la petición
        if (ignoreInterceptions.some(url => config.url?.includes(url))) {
            return config;
        }

        // Verificar si el usuario está autenticado y su sesión es válida
        const user = auth.user() as User;
        if (!user || new Date().getTime() > user?.expiry) {
            localStorage.removeItem("user");
            window.location.reload();
            return Promise.reject("Sesión expirada");
        }

        // Asegurar que config.headers no es undefined
        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
        }

        // Asignamos los nuevos valores manteniendo los headers existentes
        Object.assign(config.headers, {
            'user-name': user?.userName || '',
            'x-api-token': user?.integrationCode || ''
        });

        return config;
    }, error => Promise.reject(error));

    axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            console.error("Error en la respuesta:", error);
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;
