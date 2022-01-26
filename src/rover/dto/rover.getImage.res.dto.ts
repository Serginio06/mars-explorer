import { ApiProperty } from '@nestjs/swagger';
import { Images } from '../../image-provider/interfaces/image.provider';

export class RoverGetImageResDto {
  @ApiProperty({
    type: Images,
    description: 'Images from rover',
    required: true,
    isArray: true,
  })
  images: Images;

  @ApiProperty({
    type: 'boolean',
    description: 'Does it cached data',
    required: true,
  })
  cacheHit: boolean;
}
