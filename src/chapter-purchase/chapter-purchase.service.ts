import { Injectable } from '@nestjs/common';
import { CreateChapterPurchaseDto } from './dto/create-chapter-purchase.dto';
import { UpdateChapterPurchaseDto } from './dto/update-chapter-purchase.dto';

@Injectable()
export class ChapterPurchaseService {
  create(createChapterPurchaseDto: CreateChapterPurchaseDto) {
    return 'This action adds a new chapterPurchase';
  }

  findAll() {
    return `This action returns all chapterPurchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapterPurchase`;
  }

  update(id: number, updateChapterPurchaseDto: UpdateChapterPurchaseDto) {
    return `This action updates a #${id} chapterPurchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapterPurchase`;
  }
}
