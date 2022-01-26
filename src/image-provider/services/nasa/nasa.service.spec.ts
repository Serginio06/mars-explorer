import { Test, TestingModule } from '@nestjs/testing';
import { NasaService } from './nasa.service';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ImageProviderService } from '../image-provider/image-provider.service';
import { Observable } from 'rxjs';
import {
  Rover,
  RoverCamera,
} from '../../../rover/interfaces/rover.getImage.req.interface';

describe('NasaService', () => {
  let service: NasaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), ConfigModule.forRoot(), HttpModule],
      providers: [ImageProviderService, NasaService],
      exports: [ImageProviderService],
    }).compile();

    service = module.get<NasaService>(NasaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Check memory cache', async () => {
    const mock = {
      photos: [
        {
          id: 424905,
          sol: 1000,
          camera: {
            id: 22,
            name: 'MAST',
            rover_id: 5,
            full_name: 'Mast Camera',
          },
          img_src:
            'http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg',
          earth_date: '2015-05-30',
          rover: {
            id: 5,
            name: 'Curiosity',
            landing_date: '2012-08-06',
            launch_date: '2011-11-26',
            status: 'active',
          },
        },
      ],
    };

    const observable = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(mock);
        subscriber.complete();
      }, 1000);
      setTimeout(() => {
        subscriber.next(mock);
        subscriber.complete();
      }, 1000);
    });

    jest.spyOn(service as any, 'getHttp').mockImplementation(() => observable);

    let result = await service.getImagesBySol({
      rover: 'Curiosity' as Rover,
      sol: 1000,
      camera: 'main' as RoverCamera,
    });

    expect(result.cacheHit).toBe(false);

    result = await service.getImagesBySol({
      rover: 'Curiosity' as Rover,
      sol: 1000,
      camera: 'main' as RoverCamera,
    });

    expect(result.cacheHit).toBe(true);
  });
});
