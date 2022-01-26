import {
  BadRequestException,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  ImageProvider,
  ImageProviderName,
  NasaResponse,
} from '../../interfaces/image.provider';
import {
  ROVER_CAMERA_MAPPER,
  RoverGetImageReqInterface,
} from '../../../rover/interfaces/rover.getImage.req.interface';
import { ConfigService } from '@nestjs/config';
import { RoverGetImageResInterface } from '../../../rover/interfaces/rover.getImage.res.interface';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import * as path from 'path';
import { firstValueFrom, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class NasaService implements ImageProvider {
  public name: ImageProviderName;
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpClient: HttpService,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.name = 'NASA' as ImageProviderName;
    this.baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
    this.apiKey = this.config.get('API_KEY');
  }

  async getImagesBySol(
    payload: RoverGetImageReqInterface,
  ): Promise<RoverGetImageResInterface> {
    const { rover, sol, camera } = payload;

    const cacheKey = this.getCacheKey(payload);
    const cachedData: RoverGetImageResInterface['images'] =
      await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return {
        images: cachedData,
        cacheHit: true,
      };
    }

    const nasaCamera = ROVER_CAMERA_MAPPER[this.name.toUpperCase()][camera];

    const url =
      this.baseUrl +
      path.join(
        rover.toLowerCase(),
        `photos?sol=${sol}&camera=${nasaCamera}&api_key=${this.apiKey}&page=1`,
      );

    /** As it is test task I fetch only first page from NASA site "page=1" */
    const observable = this.getHttp(url);
    const response: NasaResponse = await firstValueFrom(observable);

    /** According design-by-contract (doC) principle we usually transform response from external API before return it to our client
     *  As for test task I did it with map but Nest has powerful mechanism for this purposed - Interceptors
     */
    const images = response.photos.map((item) => ({
      id: item.id,
      sol: item.sol,
      roverName: item.rover.name,
      cameraName: item.camera.name,
      imgSrc: item.img_src,
      earthDate: item.earth_date,
    }));

    /** put data in cache with ttl 5 min; */
    await this.cacheManager.set(cacheKey, images, { ttl: 5 * 60 * 1000 });

    return {
      images,
      cacheHit: false,
    };
  }

  /** If external API returns a error to us, the httpService's response will bubble up through
   * the NasaService to the RoverController where NestJS will handle it and return 500 to client
   * This time for test task purposed I implemented custom error handling
   */
  private getHttp(url): Observable<NasaResponse> {
    return this.httpClient.get(url).pipe(
      map((response) => response.data || null),
      catchError((e) => {
        console.error('get images from api.nasa.gov failed. ', e.message);

        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Remote service is not available now. Please try later',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  private getCacheKey(payload): string {
    return [this.name, ...Object.values(payload)].join('_');
  }
}
