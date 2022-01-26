import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoverController } from './controllers/rover.controller';
import { ImageProviderModule } from '../image-provider/image-provider.module';

@Module({
  imports: [ConfigModule.forRoot(), ImageProviderModule],
  controllers: [RoverController],
})
export class RoverModule {}
