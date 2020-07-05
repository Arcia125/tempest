export interface MatchV4ParticipantTimelineDTO {
  /**
   * Participant's calculated lane. MID and BOT are legacy values.
   *              (Legal values:  MID,  MIDDLE,  TOP,  JUNGLE,  BOT,  BOTTOM)
   */
  lane?: 'MID' | 'MIDDLE' | 'TOP' | 'JUNGLE' | 'BOT' | 'BOTTOM';
  participantId?: number; // int32



  /**
   * Creep score difference versus the calculated lane opponent(s) for a specified period.
   */
  csDiffPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Gold for a specified period.
   */
  goldPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Experience difference versus the calculated lane opponent(s) for a specified period.
   */
  xpDiffPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Creeps for a specified period.
   */
  creepsPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Experience change for a specified period.
   */
  xpPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Participant's calculated role.
   *              (Legal values:  DUO,  NONE,  SOLO,  DUO_CARRY,  DUO_SUPPORT)
   */
  role?: 'DUO' | 'NONE' | 'SOLO' | 'DUO_CARRY' | 'DUO_SUPPORT';
  /**
   * Damage taken difference versus the calculated lane opponent(s) for a specified period.
   */
  damageTakenDiffPerMinDeltas?: {
    [name: string]: number; // double
  };
  /**
   * Damage taken for a specified period.
   */
  damageTakenPerMinDeltas?: {
    [name: string]: number; // double
  };
}
