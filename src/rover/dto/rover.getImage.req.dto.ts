import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Rover, RoverCamera } from '../interfaces/rover.getImage.req.interface';

export class RoverGetImageReqDto {
  @ApiProperty({
    type: 'string',
    description: 'Rover name',
    example: 'Perseverance',
    enum: ['curiosity', 'opportunity'],
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Rover)
  rover: Rover;

  @ApiProperty({
    type: 'integer',
    description: 'Martian day starting at 0 for landing day',
    required: true,
    example: 3,
    minimum: 0,
    maximum: 10000,
  })
  @IsNotEmpty()
  sol: number;

  @ApiProperty({
    type: 'string',
    description: 'Rover camera name',
    required: true,
    example: 'main',
    enum: ['main', 'camera1'],
  })
  @IsNotEmpty()
  @IsEnum(RoverCamera)
  camera: RoverCamera;
}
