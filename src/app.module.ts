import { Module } from '@nestjs/common';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';

@Module({
  imports: [],
  controllers: [WordsController],
  providers: [WordsService],
})
export class AppModule {}
