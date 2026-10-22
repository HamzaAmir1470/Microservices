import { Controller, Get, Inject, Query } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface InventoryService {
  checkStock(data: { productId: string }): Observable<any>;
}
@Controller('order')
export class AppController implements OnModuleInit {
  private inventoryService!: InventoryService;

  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.inventoryService =
      this.client.getService<InventoryService>('InventoryService');
  }
  @Get('check-item')
  async checkItem(@Query('pid') pid: string) {
    const stockStatus = await lastValueFrom(
      this.inventoryService.checkStock({ productId: pid }),
    );
    if (stockStatus && stockStatus.inStock) {
      return { status: 'Available', quantity: stockStatus.availableQuantity };
    }
    return { status: 'Out of Stock' };
  }
}
