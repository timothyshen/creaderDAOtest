import { Module } from '@nestjs/common';
import { ChapterPurchaseService } from './chapter-purchase.service';
import { ChapterPurchaseController } from './chapter-purchase.controller';

@Module({
  controllers: [ChapterPurchaseController],
  providers: [ChapterPurchaseService]
})
export class ChapterPurchaseModule {}
