import { MatchV4PlayerDTO } from './MatchV4PlayerDTO';

export interface MatchV4ParticipantIdentityDTO {
  /**
 * Player information.
 */
  player?: MatchV4PlayerDTO;
  participantId?: number;
}
