import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterPurchaseDto } from './create-chapter-purchase.dto';

export class UpdateChapterPurchaseDto extends PartialType(CreateChapterPurchaseDto) {}
