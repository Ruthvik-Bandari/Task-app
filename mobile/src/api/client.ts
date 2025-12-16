import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  AuthResponse,
  PaginatedResponse,
  TaskStats,
} from '../types';

// Change this to your backend URL
const API_URL = 'https://taskapp-api-tin3.onrender.com/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(async (config) => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await this.client.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('accessToken', data.accessToken);
    return data;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const { data } = await this.client.post('/auth/register', { email, password, name });
    await SecureStore.setItemAsync('accessToken', data.accessToken);
    return data;
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('accessToken');
  }

  async getMe(): Promise<AuthResponse['user']> {
    const { data } = await this.client.get('/auth/me');
    return data;
  }

  async getTasks(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<PaginatedResponse<Task>> {
    const { data } = await this.client.get('/tasks', { params });
    return data;
  }

  async getTask(id: string): Promise<Task> {
    const { data } = await this.client.get(`/tasks/${id}`);
    return data;
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const { data } = await this.client.post('/tasks', input);
    return data;
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    const { data } = await this.client.patch(`/tasks/${id}`, input);
    return data;
  }

  async deleteTask(id: string): Promise<void> {
    await this.client.delete(`/tasks/${id}`);
  }

  async toggleTaskComplete(id: string): Promise<Task> {
    const { data } = await this.client.patch(`/tasks/${id}/toggle`);
    return data;
  }

  async getTaskStats(): Promise<TaskStats> {
    const { data } = await this.client.get('/tasks/stats');
    return data;
  }
}

export const api = new ApiClient();
