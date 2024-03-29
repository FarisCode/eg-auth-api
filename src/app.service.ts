import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  getStatus(): string {
    return 'Server is running!';
  }
}
