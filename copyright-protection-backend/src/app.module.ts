import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [PurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
