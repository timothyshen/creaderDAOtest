import { Test, TestingModule } from '@nestjs/testing';
import { ChapterPurchaseService } from './chapter-purchase.service';

describe('ChapterPurchaseService', () => {
  let service: ChapterPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapterPurchaseService],
    }).compile();

    service = module.get<ChapterPurchaseService>(ChapterPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
