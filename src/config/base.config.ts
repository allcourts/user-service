import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  validateSync,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import { Environment } from './enum/environment.enum';

class EnvironmentVariablesDto {
  @IsNumber()
  @IsPositive()
  PORT: number;

  @IsString()
  @IsEnum(Environment)
  ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  @IsPositive()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

export interface EnvConfig {
  port: number;
  env: Environment;
  database: DatabaseConfig;
}

export default registerAs('base', () => {
  const validatedConfig = plainToClass(EnvironmentVariablesDto, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  const envConfig: EnvConfig = {
    port: validatedConfig.PORT,
    env: validatedConfig.ENV,
    database: {
      host: validatedConfig.DB_HOST,
      port: validatedConfig.DB_PORT,
      name: validatedConfig.DB_NAME,
      username: validatedConfig.DB_USERNAME,
      password: validatedConfig.DB_PASSWORD,
    },
  };

  return envConfig;
});
