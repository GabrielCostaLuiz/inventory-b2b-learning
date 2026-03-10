import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'OK';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
