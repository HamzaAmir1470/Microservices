import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import Consul from 'consul';

@Injectable()
export class AppService {
  private consul = new Consul({ host: 'localhost', port: 8500 });

  async discoverAndCallPayment() {
    const services = await this.consul.agent.service.list();
    const paymentInfo = services['payement-unique-id-1'];
    if (!paymentInfo) {
      throw new Error('Payment service not found');
    }
=======

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
>>>>>>> 2bef82bcf68b380a6aff2c0900ac70a628d56e75
  }
}
