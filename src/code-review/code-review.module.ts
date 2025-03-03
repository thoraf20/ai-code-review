import { Module } from '@nestjs/common';
import { CodeReviewService } from './code-review.service';
import { CodeReviewController } from './code-review.controller';
import { CodeReview } from './entities/codeReview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CodeReview])],
  providers: [CodeReviewService],
  controllers: [CodeReviewController],
})
export class CodeReviewModule {}
