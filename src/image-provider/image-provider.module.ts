import { CacheModule, Module } from '@nestjs/common';
import { ImageProviderService } from './services/image-provider/image-provider.service';
import { NasaService } from './services/nasa/nasa.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 3,
      }),
    }),
  ],
  providers: [ImageProviderService, NasaService],
  exports: [ImageProviderService],
})
export class ImageProviderModule {}
