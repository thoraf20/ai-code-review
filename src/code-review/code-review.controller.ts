/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CodeReviewService } from './code-review.service';

@Controller('code-review')
export class CodeReviewController {
  constructor(private readonly codeReviewService: CodeReviewService) {}

  @Post()
  async submitCode(
    @Body('code') code: string,
    @Body('language') language: string,
  ) {
    return await this.codeReviewService.submitCode(code, language);
  }

  @Get()
  async getAllReviews() {
    return await this.codeReviewService.getReviews();
  }
}
