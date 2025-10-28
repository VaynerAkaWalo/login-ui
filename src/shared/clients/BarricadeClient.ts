import { HTTPClient } from "./Client.ts";
import type { AxiosPromise } from "axios";

export interface LoginRequest {
  name: string;
  secret: string;
}

export interface Identity {
  name: string;
  id: string;
}

class BarricadeClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "/api";
  }

  public login = (request: LoginRequest): Promise<AxiosPromise<void>> => {
    return HTTPClient.post(this.baseUrl + "/v1/login", request);
  };

  public register = (request: LoginRequest): Promise<AxiosPromise<void>> => {
    return HTTPClient.post(this.baseUrl + "/v1/register", request);
  };

  public logout = (request: any): Promise<AxiosPromise<void>> => {
    return HTTPClient.post(this.baseUrl + "/v1/logout", request);
  };

  public getIdentity = async (): Promise<AxiosPromise<Identity>> => {
    return HTTPClient.get(this.baseUrl + "/v1/whoami");
  };
}

export const AuthenticationClient = new BarricadeClient();
