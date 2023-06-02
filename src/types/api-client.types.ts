import { AxiosInstance } from "axios";

export type ApiClient = {
  getInstance(): AxiosInstance;
};
