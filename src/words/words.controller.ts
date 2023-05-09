import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('words')
export class WordsController {
  async getWords(): Promise<string[]> {
    const filePath = path.resolve(__dirname, '..', 'assets', 'words.json');
    const file = fs.readFileSync(filePath);
    const json = JSON.parse(file.toString());

    return json.json();
  }

  @Get()
  async getAll(@Res() response: Response) {
    const words = await this.getWords();
    return response.send(words);
  }

  @Get('count')
  async getByCount(@Req() request: Request, @Res() response: Response) {
    const words = await this.getWords();
    return response.send(words);
  }

  @Get('letter')
  async getByLetter(@Req() request: Request, @Res() response: Response) {
    const words = await this.getWords();
    return response.send(words);
  }
}
