const environmentVariablesMock = {
  PORT: '3000',
  ENV: 'test',
  DB_HOST: 'host',
  DB_PORT: '1234',
  DB_NAME: 'database',
  DB_USERNAME: 'username',
  DB_PASSWORD: 'password',
};

export default () => (process.env = environmentVariablesMock);
