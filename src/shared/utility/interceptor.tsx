/* import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import session from '@/shared/';

class Interceptor {
    init() {
        axios.interceptors.request.use(
            async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
                const user = session.user();
                if (user) {
                    config.headers = {
                        'x-api-token': user.token,
                        'x-api-key': user.key,
                        'user-name': user.userName,
                    };
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            async (response: AxiosResponse): Promise<AxiosResponse> => {
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }
}

export default new Interceptor();
 */