import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: process.env.PORT ? Number(process.env.PORT) : 8889,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Hybrid Application is running on:3000 on rest and 8889 on microservices TCP: ${await app.getUrl()}`,
  );
}

bootstrap();
