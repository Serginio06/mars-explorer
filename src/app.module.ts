import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RoverModule } from './rover/rover.module';

@Module({
  imports: [ConfigModule.forRoot(), RoverModule],
})
export class AppModule {}
