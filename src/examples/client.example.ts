import axios, { AxiosInstance } from "axios";
import { ApiClient } from "../types/api-client.types";

type ExampleApiClient = ApiClient & {
  // TODO: Add any additional methods here.
};

class ClientExample implements ExampleApiClient {
  private readonly http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "https://example.com",
    });
  }

  getInstance(): AxiosInstance {
    return this.http;
  }
}
