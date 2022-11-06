import { Test, TestingModule } from '@nestjs/testing';
import { ChapterPurchaseController } from './chapter-purchase.controller';
import { ChapterPurchaseService } from './chapter-purchase.service';

describe('ChapterPurchaseController', () => {
  let controller: ChapterPurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChapterPurchaseController],
      providers: [ChapterPurchaseService],
    }).compile();

    controller = module.get<ChapterPurchaseController>(ChapterPurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
