import { ImageProviderName } from '../../image-provider/interfaces/image.provider';

export enum Rover {
  curiosity = 'curiosity',
  opportunity = 'opportunity',
}

export enum RoverCamera {
  main = 'main',
  camera1 = 'camera1',
}

export enum nasaRoverCamera {
  MAST = 'MAST',
  PANCAM = 'PANCAM',
}

export const ROVER_CAMERA_MAPPER = {
  [ImageProviderName.NASA]: {
    main: 'MAST',
    camera1: 'PANCAM',
  },
};

export interface RoverGetImageReqInterface {
  rover: Rover;
  sol: number;
  camera: RoverCamera;
}
