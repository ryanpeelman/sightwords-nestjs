import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('words')
export class WordsController {
  @Get()
  async getJson(@Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', 'assets', 'words.json');
    const file = fs.readFileSync(filePath);
    return res.send(JSON.parse(file.toString()));
  }
}
