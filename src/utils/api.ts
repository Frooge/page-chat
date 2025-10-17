import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

class Api {
	private client = axios.create({
		baseURL: API_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.client.get<T>(endpoint, config);
	}

	public async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.client.post<T>(endpoint, data, config);
	}
}

const api = new Api();
export default api;
