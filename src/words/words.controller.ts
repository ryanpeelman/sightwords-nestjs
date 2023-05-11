import { Controller, Get, Param } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getAll(): Promise<string[]> {
    const words = await this.wordsService.getWords();
    return words;
  }

  @Get('count/:count')
  async getByCount(@Param('count') count: number): Promise<string[]> {
    const words = await this.wordsService.getWords();
    return words.slice(0, count);
  }

  @Get('letter/:letter')
  async getByLetter(@Param('letter') letter: string): Promise<string[]> {
    const words = await this.wordsService.getWords();
    return words.filter((w) => w.startsWith(letter));
  }
}
