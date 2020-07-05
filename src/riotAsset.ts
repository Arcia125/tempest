import { RiotImageType } from './types';
import { championsByKey } from './data/championData';

const CDN_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/'
const PATCH_VERSION = '10.11.1';
// const PATCH_VERSION = '10.10.3216176';

/**
 * @description Uses imageType to determine the base url for an asset.
 */
const getBaseImageAssetUrl = (imageType: RiotImageType) => {
  switch (imageType) {
    case RiotImageType.LOADING:
    case RiotImageType.SPLASH: return `${CDN_BASE_URL}/img/`;
    default: return `${CDN_BASE_URL}${PATCH_VERSION}/img/`;
  }
};

/**
 * @description Determines the url for an image asset
 * @param imageType The image type, eg. "champion", "spell", or "item"
 * @param imageName The image name, eg. "Ryze", "SummonerFlash", or "FlashFrost"
 * @example getImageAssetUrl('champion', 'Ryze') // http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/Aatrox.png
 */
export const getImageAssetUrl = (imageType: RiotImageType, imageName: string) => {
  const baseUrl = getBaseImageAssetUrl(imageType);
  let [imageNameWithoutExt] = imageName.split('.');
  switch (imageType) {
    case RiotImageType.SPLASH:
    case RiotImageType.LOADING: {
      if (!isNaN(parseInt(imageNameWithoutExt.slice(-1)))) {
        // An asset number was provided in the name
        return `${baseUrl}${imageType}/${imageNameWithoutExt}.jpg`;
      }
      // Use asset number 0 if an asset number wasn't included.
      return `${baseUrl}${imageType}/${imageNameWithoutExt}_0.jpg`;
    }
    case RiotImageType.PASSIVE: return `${baseUrl}${imageNameWithoutExt}_P.png`;
    default: return `${baseUrl}${imageType}/${imageNameWithoutExt}.png`;
  }
};

export const getImageNameByChampionKey = (championKey: string, imageKey: 'full' | 'sprite' | 'group' = 'full') => championsByKey[championKey].image[imageKey];
