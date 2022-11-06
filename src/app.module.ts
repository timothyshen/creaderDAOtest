import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChapterPurchaseModule } from './chapter-purchase/chapter-purchase.module';

@Module({
  imports: [ChapterPurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
