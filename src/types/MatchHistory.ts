import { MatchHistoryItem } from './MatchHistoryItem';

export interface MatchHistory {
  matches: MatchHistoryItem[];
  startIndex: number;
  endIndex: number;
  totalGames: number;
}
