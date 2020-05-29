import championJson from './champion.json';
import { ChampionDTO } from './types';
import { mapBy } from './utils';

// const championNames = Object.keys(championJson.data);

const champions: ChampionDTO[] = Object.values(championJson.data);

/**
 * @description champions mapped by key.
 */
const championsByKey = mapBy(champions, 'key');

export { championJson, championsByKey };
