import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChapterPurchaseService } from './chapter-purchase.service';
import { CreateChapterPurchaseDto } from './dto/create-chapter-purchase.dto';
import { UpdateChapterPurchaseDto } from './dto/update-chapter-purchase.dto';

@Controller('chapter-purchase')
export class ChapterPurchaseController {
  constructor(private readonly chapterPurchaseService: ChapterPurchaseService) {}

  @Post()
  create(@Body() createChapterPurchaseDto: CreateChapterPurchaseDto) {
    return this.chapterPurchaseService.create(createChapterPurchaseDto);
  }

  @Get()
  findAll() {
    return this.chapterPurchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterPurchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterPurchaseDto: UpdateChapterPurchaseDto) {
    return this.chapterPurchaseService.update(+id, updateChapterPurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterPurchaseService.remove(+id);
  }
}
