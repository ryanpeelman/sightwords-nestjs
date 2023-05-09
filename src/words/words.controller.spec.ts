import { Test, TestingModule } from '@nestjs/testing';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const testWords = [
  'a',
  'about',
  'after',
  'all',
  'am',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'big',
  'but',
  'by',
  'call',
  'can',
  'come',
  'could',
];

describe('WordsController', () => {
  let controller: WordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
    })
      .useMocker((token) => {
        if (token === WordsService) {
          return { getWords: jest.fn().mockResolvedValue(testWords) };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<WordsController>(WordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all words', async () => {
      const words = await controller.getAll();
      expect(words).toBeDefined();
      expect(words.length).toBe(testWords.length);
      expect(words.sort()).toEqual(testWords.sort());
    });
  });

  describe('getByCount', () => {
    it('should return N elements', async () => {
      const count = 5;
      const expectedCount = count;

      const words = await controller.getByCount(count);
      expect(words).toBeDefined();
      expect(words.length).toBe(expectedCount);
    });

    it('should return all elements if N is greater than the available amount', async () => {
      const count = 500;
      const expectedCount = testWords.length;

      const words = await controller.getByCount(count);
      expect(words).toBeDefined();
      expect(words.length).toBe(expectedCount);
    });
  });

  describe('getByLetter', () => {
    it.each([
      { letter: 'a', expectedCount: 10 },
      { letter: 'b', expectedCount: 7 },
      { letter: 'c', expectedCount: 4 },
      { letter: 'z', expectedCount: 0 },
    ])(
      'should return all elements for given letter',
      async (parameters: { letter: string; expectedCount: number }) => {
        const { expectedCount, letter } = parameters;

        const words = await controller.getByLetter(letter);
        expect(words).toBeDefined();
        expect(words.length).toBe(expectedCount);
      },
    );
  });
});
