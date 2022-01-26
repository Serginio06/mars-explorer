import { RoverGetImageResInterface } from '../../rover/interfaces/rover.getImage.res.interface';
import { number } from 'joi';
import { Rover } from '../../rover/interfaces/rover.getImage.req.interface';
import { ApiProperty } from '@nestjs/swagger';

// export type Images = {
//   id: number;
//   sol: number;
//   roverName: string;
//   cameraName: string;
//   imgSrc: string;
//   earthDate: string;
// }[];

export class Images {
  id: number;

  sol: number;

  @ApiProperty({
    type: 'string',
    description: 'Rover name',
    example: 'Perseverance',
    isArray: false,
    enum: ['curiosity', 'opportunity'],
  })
  roverName: string;

  @ApiProperty({
    type: 'string',
    description: 'Rover camers name',
    example: 'MAST',
    isArray: false,
  })
  cameraName: string;

  @ApiProperty({
    type: 'string',
    description: 'url to image',
    example:
      'http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg',
    isArray: false,
  })
  imgSrc: string;

  @ApiProperty({
    type: 'string',
    example: '2015-05-30',
    isArray: false,
  })
  earthDate: string;
}

export type NasaResponse = {
  photos: {
    id: number;
    sol: number;
    camera: {
      id: number;
      name: string;
      rover_id: number;
      full_name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
      id: number;
      name: string;
      landing_date: string;
      launch_date: string;
      status: string;
    };
  }[];
};

export enum ImageProviderName {
  NASA = 'NASA',
}

export interface ImageProvider {
  name: ImageProviderName;
  getImagesBySol(RoverGetImageReqInterface): Promise<RoverGetImageResInterface>;
}
