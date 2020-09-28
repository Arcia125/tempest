import { MatchHistoryItem } from '../operations';
import championJson from '../static-data/champion.json';
import { ChampionDTO } from '../types';
import { mapBy } from '../utils';

// const championNames = Object.keys(championJson.data);

const champions: ChampionDTO[] = Object.values(championJson.data);

/**
 * @description champions mapped by key.
 */
const championsByKey = mapBy(champions, 'key');

const getChampionName = (matchHistoryItem: MatchHistoryItem) => championsByKey[matchHistoryItem.champion || '']?.name

export { championJson, championsByKey, getChampionName };
