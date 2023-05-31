import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get('/')
  @ApiOperation({
    summary:
      'Retrieve all sightwords; optionally constrained to those that start with a specified letter and/or a specified amount of words to return',
  })
  @ApiQuery({
    name: 'count',
    description: 'count',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'letter',
    description: 'letter',
    required: false,
    type: String,
  })
  async getAll(
    @Query('count') count?: number,
    @Query('letter') letter?: string,
  ): Promise<string[]> {
    let words = await this.wordsService.getWords();

    if (letter) {
      words = await this.getByLetter(letter, words);
    }

    if (count) {
      words = await this.getByCount(count, words);
    }

    return words;
  }

  async getByCount(count: number, source?: string[]): Promise<string[]> {
    const words = source ?? (await this.wordsService.getWords());
    return words.slice(0, count);
  }

  async getByLetter(letter: string, source?: string[]): Promise<string[]> {
    const words = source ?? (await this.wordsService.getWords());
    return words.filter(
      (w) =>
        w.startsWith(letter.toLowerCase()) ||
        w.startsWith(letter.toUpperCase()),
    );
  }
}
