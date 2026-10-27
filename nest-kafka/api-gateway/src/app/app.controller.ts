import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Get('create-user')
  async createUser() {
    const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    await this.kafkaClient.emit('user.created', user);
    return {
      message: 'User created event sent to Kafka',
      user,
    };
  }
}
