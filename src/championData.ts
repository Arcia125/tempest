import { ChampionKeyMap, ChampionDTO } from './types';
import championJson from './champion.json';

const getChampions = () => Object.values(championJson.data);

/**
 * @description Maps champions by key (championJson.data is mapped by name);
 */
const mapChampionsByKey = (champs: ChampionDTO[]): ChampionKeyMap => champs.reduce((acc, curr) => {
  acc[curr.key] = curr;
  return acc;
}, {} as ChampionKeyMap);

/**
 * @description champions mapped by key.
 */
const championsByKey = mapChampionsByKey(getChampions());

export { championJson, championsByKey };
