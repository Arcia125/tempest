import { MatchV4TeamStatsDTO } from './MatchV4TeamStatsDTO';
import { MatchV4ParticipantDTO } from './MatchV4ParticipantDTO';
import { MatchV4ParticipantIdentityDTO } from './MatchV4ParticipantIdentityDTO';

export interface MatchHistoryDetails {
  /**
   * Please refer to the Game Constants documentation.
   */
  seasonId?: number;
  /**
   * Please refer to the Game Constants documentation.
   */
  queueId?: number;
  gameId?: number; // int64



  /**
   * Participant identity information.
   */
  participantIdentities?: MatchV4ParticipantIdentityDTO[];
  /**
   * The major.minor version typically indicates the patch the match was played on.
   */
  gameVersion?: string;
  /**
   * Platform where the match was played.
   */
  platformId?: string;
  /**
   * Please refer to the Game Constants documentation.
   */
  gameMode?: string;
  /**
   * Please refer to the Game Constants documentation.
   */
  mapId?: number;
  /**
   * Please refer to the Game Constants documentation.
   */
  gameType?: string;
  /**
   * Team information.
   */
  teams?: MatchV4TeamStatsDTO[];
  /**
   * Participant information.
   */
  participants?: MatchV4ParticipantDTO[];
  /**
   * Match duration in seconds.
   */
  gameDuration?: number; // int64



  /**
   * Designates the timestamp when champion select ended and the loading screen appeared, NOT when the game timer was at 0:00.
   */
  gameCreation?: number; // int64
}
