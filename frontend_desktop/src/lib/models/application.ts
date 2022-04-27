export interface IAppHost {
  port: string;
  address: string;
}
export interface IAppConfigHosts {
  host: IAppHost;
  invoices: IAppHost;
}
export interface IAppConfig {
  proxy: IAppConfigHosts;
}
