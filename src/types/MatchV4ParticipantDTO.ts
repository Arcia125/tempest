import { MatchV4ParticipantStatsDTO } from './MatchV4ParticipantStatsDTO';
import { MatchV4RuneDTO } from './MatchV4RuneDTO';
import { MatchV4ParticipantTimelineDTO } from './MatchV4ParticipantTimelineDTO';
import { MatchV4MasteryDTO } from './MatchV4MasteryDTO';

export interface MatchV4ParticipantDTO {
  /**
   * Participant statistics.
   */
  stats?: MatchV4ParticipantStatsDTO;
  participantId?: number; // int32



  /**
   * List of legacy Rune information. Not included for matches played with Runes Reforged.
   */
  runes?: MatchV4RuneDTO[];
  /**
   * Participant timeline data.
   */
  timeline?: MatchV4ParticipantTimelineDTO;
  /**
   * 100 for blue side. 200 for red side.
   */
  teamId?: number; // int32



  /**
   * Second Summoner Spell id.
   */
  spell2Id?: number; // int32



  /**
   * List of legacy Mastery information. Not included for matches played with Runes Reforged.
   */
  masteries?: MatchV4MasteryDTO[];
  /**
   * Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation.
   *              (Legal values:  CHALLENGER,  MASTER,  DIAMOND,  PLATINUM,  GOLD,  SILVER,  BRONZE,  UNRANKED)
   */
  highestAchievedSeasonTier?: 'CHALLENGER' | 'MASTER' | 'DIAMOND' | 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE' | 'UNRANKED';
  /**
   * First Summoner Spell id.
   */
  spell1Id?: number; // int32
  championId?: number; // int32
}
