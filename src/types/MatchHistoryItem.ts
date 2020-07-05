import { MatchHistoryDetails } from './MatchHistoryDetails';

export interface MatchHistoryItem {
  platformId: string;
  gameId: number;
  champion: number;
  queue: string;
  season: number;
  timestamp: string;
  role: string;
  lane: string;
  details: MatchHistoryDetails;
}
