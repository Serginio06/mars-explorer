import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RoverGetImageResInterface } from '../src/rover/interfaces/rover.getImage.res.interface';
import { NasaService } from '../src/image-provider/services/nasa/nasa.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ImageProviderService } from '../src/image-provider/services/image-provider/image-provider.service';
import {
  Rover,
  RoverCamera,
} from '../src/rover/interfaces/rover.getImage.req.interface';
import { Images } from '../src/image-provider/interfaces/image.provider';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let nasaService: NasaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        CacheModule.register(),
        ConfigModule.forRoot(),
        HttpModule,
      ],
      providers: [ImageProviderService, NasaService],
      exports: [ImageProviderService],
    }).compile();

    nasaService = moduleFixture.get<NasaService>(NasaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Check get rover images. no cash', async () => {
    const mock = {
      images: [
        {
          id: 424929,
          sol: 1000,
          roverName: 'Curiosity',
          cameraName: 'MAST',
          imgSrc:
            'http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631180503678E01_DXXX.jpg',
          earthDate: '2015-05-30',
        },
      ],
      cacheHit: false,
    };

    jest
      .spyOn(nasaService, 'getImagesBySol')
      .mockImplementation(async () => mock);

    const result = (
      await request(app.getHttpServer()).get(
        '/mars/nasa/rover-image?rover=curiosity&sol=1000&camera=main',
      )
    ).body as RoverGetImageResInterface;

    expect(result.cacheHit).toBe(false);
    expect(result).toMatchObject(mock);
  });

  afterAll(async () => {
    await app.close();
  });
});
