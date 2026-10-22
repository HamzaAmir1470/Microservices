import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { MessagePattern } from '@nestjs/microservices/decorators/index.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Hello')
  getHello(): string {
    return 'Hello from rest api!';
  }

  @MessagePattern({ cmd: 'get_status' })
  getStatus(data: any): string {
    console.log('Microservices Received data:', data);
    return 'Microservice is running!';
  }
}
