import { Images } from '../../image-provider/interfaces/image.provider';

export interface RoverGetImageResInterface {
  images: Images[];
  cacheHit: boolean;
}
