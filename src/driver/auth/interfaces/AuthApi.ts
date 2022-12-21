import {
  IAuthInfrastructure,
  TToken,
} from "src/driver/auth/interfaces/AuthInfrastructure";
import { Api } from "src/driver/axiosConfig";

export class AuthApi implements IAuthInfrastructure {
  async getToken(email: string, password: string): Promise<string> {
    const res = await Api.post<TToken>("/token/", { email, password });
    return res.data.token;
  }

  async verify(token: string): Promise<string> {
    const res = await Api.post<TToken>("/token/verify/", { token });
    return res.data.token;
  }

  async refresh(token: string): Promise<string> {
    const res = await Api.post<TToken>("/token/refresh/", { token });
    return res.data.token;
  }
}
