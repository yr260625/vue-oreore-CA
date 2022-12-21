export interface IAuthInfrastructure {
  getToken(email: string, password: string): Promise<String>;
  verify(token: string): Promise<String>;
  refresh(token: string): Promise<String>;
}

export type TToken = {
  token: string;
};
