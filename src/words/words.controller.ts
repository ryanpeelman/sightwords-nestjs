import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getAll(@Res() response: Response) {
    const words = await this.wordsService.getWords();
    return response.send(words);
  }

  @Get('count')
  async getByCount(@Req() request: Request, @Res() response: Response) {
    const words = await this.wordsService.getWords();
    return response.send(words);
  }

  @Get('letter')
  async getByLetter(@Req() request: Request, @Res() response: Response) {
    const words = await this.wordsService.getWords();
    return response.send(words);
  }
}
