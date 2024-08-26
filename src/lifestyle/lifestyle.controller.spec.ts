import { Test, TestingModule } from '@nestjs/testing';
import { LifeStyleController } from './lifestyle.controller';

describe('LifestyleController', () => {
  let controller: LifeStyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeStyleController],
    }).compile();

    controller = module.get<LifeStyleController>(LifeStyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
