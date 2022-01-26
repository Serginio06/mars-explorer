import { Test, TestingModule } from '@nestjs/testing';
import { ImageProviderService } from './image-provider.service';
import { HttpModule } from '@nestjs/axios';
import { NasaService } from '../nasa/nasa.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/common';

describe('ImageProviderService', () => {
  let service: ImageProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), ConfigModule.forRoot(), HttpModule],
      providers: [ImageProviderService, NasaService],
      exports: [ImageProviderService],
    }).compile();

    service = module.get<ImageProviderService>(ImageProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
