import { RoverGetImageReqDto } from '../dto/rover.getImage.req.dto';
import { RoverGetImageReqInterface } from '../interfaces/rover.getImage.req.interface';
import { BadRequestException, PipeTransform } from '@nestjs/common';

/**
 * The pipe allows to validate request values and do transformation object property/value.
 */
export class RoverGetImageReqPipe
  implements PipeTransform<RoverGetImageReqDto, RoverGetImageReqInterface>
{
  transform(roverGetImageReq: RoverGetImageReqDto): RoverGetImageReqInterface {
    const { rover, sol, camera } = roverGetImageReq;

    // sol should be positive
    if (+sol < 0) {
      throw new BadRequestException('Sol should be 0 or more');
    }

    // transform values to internal format
    return {
      rover,
      sol: +sol,
      camera,
    };
  }
}
