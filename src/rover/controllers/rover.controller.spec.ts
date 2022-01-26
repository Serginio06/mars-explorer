import { Test, TestingModule } from '@nestjs/testing';
import { RoverController } from './rover.controller';
import { ConfigModule } from '@nestjs/config';
import { ImageProviderModule } from '../../image-provider/image-provider.module';

describe('MarsController', () => {
  let controller: RoverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ImageProviderModule],
      controllers: [RoverController],
    }).compile();

    controller = module.get<RoverController>(RoverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
