import { Controller, Get, HttpStatus, Query, Param } from '@nestjs/common';
import { RoverGetImageResInterface } from '../interfaces/rover.getImage.res.interface';
import { ApiResponse } from '@nestjs/swagger';
import { RoverGetImageResDto } from '../dto/rover.getImage.res.dto';
import { RoverGetImageReqDto } from '../dto/rover.getImage.req.dto';
import { RoverGetImageReqPipe } from '../pipes/rover.getImage.req.pipe';
import { ImageProviderName } from '../../image-provider/interfaces/image.provider';
import { ImageProviderService } from '../../image-provider/services/image-provider/image-provider.service';

@Controller('mars')
export class RoverController {
  constructor(private imageProviderService: ImageProviderService) {}

  @Get('/:provider/rover-image')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoverGetImageResDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  async getImage(
    @Query(new RoverGetImageReqPipe()) payload: RoverGetImageReqDto,
    @Param('provider') providerName: ImageProviderName,
  ): Promise<RoverGetImageResInterface> {

    const imageProvider = this.imageProviderService.getImageProvider(providerName);
    const result = await imageProvider.getImagesBySol(payload);

    return result;
  }
}
