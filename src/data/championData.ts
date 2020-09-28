import { MatchHistoryItem } from '../operations';
import championJson from '../static-data/champion.json';
import { ChampionDTO } from '../types';
import { mapBy } from '../utils';
import { ChampionRecord } from './matchHistory';

// const championNames = Object.keys(championJson.data);

const champions: ChampionDTO[] = Object.values(championJson.data);

/**
 * @description champions mapped by key.
 */
const championsByKey = mapBy(champions, 'key');

const getChampionName = (search: MatchHistoryItem | string) => championsByKey[(typeof search === 'string' ? search : search.champion) || '']?.name

export { championJson, championsByKey, getChampionName };
