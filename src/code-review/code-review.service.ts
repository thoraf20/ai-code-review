/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeReview } from './entities/codeReview.entity';
import { OpenAI } from 'openai';

@Injectable()
export class CodeReviewService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(CodeReview)
    private codeReviewRepo: Repository<CodeReview>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async submitCode(code: string, language: string): Promise<CodeReview> {
    if (!code) {
      throw new HttpException('Code is required', HttpStatus.BAD_REQUEST);
    }

    const review = this.codeReviewRepo.create({ code, language });
    await this.codeReviewRepo.save(review);

    // Call AI for analysis
    const aiFeedback = await this.analyzeCode(code, language);
    const optimizedCode = await this.optimizeCode(code, language);

    review.aiFeedback = aiFeedback;
    review.optimizedCode = optimizedCode;

    await this.codeReviewRepo.save(review);
    return review;
  }

  private async analyzeCode(code: string, language: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert code reviewer. Provide feedback for ${language} code.`,
          },
          { role: 'user', content: code },
        ],
      });

      return response.choices[0]?.message?.content || 'No feedback generated';
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new HttpException(
        'Failed to analyze code',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async optimizeCode(code: string, language: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a skilled code refactoring assistant. Optimize the given ${language} code for performance and readability.`,
          },
          { role: 'user', content: code },
        ],
      });

      return (
        response.choices[0]?.message?.content || 'No optimized code generated'
      );
    } catch (error) {
      console.error('AI Optimization Error:', error);
      throw new HttpException(
        'Failed to optimize code',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReviews(): Promise<CodeReview[]> {
    return await this.codeReviewRepo.find({ order: { createdAt: 'DESC' } });
  }
}
