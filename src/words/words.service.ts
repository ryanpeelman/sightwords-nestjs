import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WordsService {
  async getWords(): Promise<string[]> {
    const filePath = path.resolve(__dirname, '..', 'assets', 'words.json');
    const file = fs.readFileSync(filePath);
    const json = JSON.parse(file.toString());

    return json.json();
  }
}
