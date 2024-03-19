// add new environment here
type EnvironmentList = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
export type EnvironmentsConfigModel = Readonly<
  Record<
    EnvironmentList,
    {
      enableLog: boolean;
      projectId: string;
      privateKey: string;
      clientEmail: string;
      databaseURL: string;
      tokenName: string;
    }
  >
>;
