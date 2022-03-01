import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  async getStatus() {
    const status = {
      service: 'OK',
      database: 'OK',
      integrations: [],
    };

    try {
      await this.connection.query('SELECT 1');
    } catch (err) {
      status.database = 'ERROR';
    }

    return status;
  }
}
