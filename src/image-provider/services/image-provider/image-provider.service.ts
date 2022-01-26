import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ImageProvider,
  ImageProviderName,
} from '../../interfaces/image.provider';
import { NasaService } from '../nasa/nasa.service';

/**
 * This is Abstract class that allow as inject other
 * image providers without impact on implemented ones
 * This respect Open-Close and Dependency Inversion Principles of SOLID
 */
@Injectable()
export class ImageProviderService {
  constructor(private readonly nasaService: NasaService) {}

  getImageProvider(providerName: ImageProviderName): ImageProvider {
    switch (providerName.toUpperCase()) {
      case ImageProviderName.NASA:
        return this.nasaService;
      default:
        throw new BadRequestException(
          `Not implemented image provider "${providerName}"`,
        );
    }
  }
}
