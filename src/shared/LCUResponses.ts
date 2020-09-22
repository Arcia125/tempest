interface RerollPoints {
  currentPoints: number;
  maxRolls: number;
  numberOfRolls: number;
  pointsCostToRoll: number;
  pointsToReroll: number;
}

export interface CurrentSummonerResponse {
  accountId: number;
  displayName: string;
  internalName: string;
  percentCompleteForNextLevel: number;
  profileIconId: number;
  puuid: string;
  rerollPoints: RerollPoints;
  summonerId: number;
  summonerLevel: number;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
}

export interface CurrentRegionResponse {
  locale: string;
  region: string;
  webLanguage: string;
  webRegion: string;
}

export interface MatchMakingResponse {
  dodgeData: DodgeData;
  errors: any[];
  estimatedQueueTime: number;
  isCurrentlyInQueue: boolean;
  lobbyId: string;
  lowPriorityData: LowPriorityData;
  queueId: number;
  readyCheck: ReadyCheck;
  searchState: string;
  timeInQueue: number;
}

export interface DodgeData {
  dodgerId: number;
  state: string;
}

export interface LowPriorityData {
  bustedLeaverAccessToken: string;
  penalizedSummonerIds: any[];
  penaltyTime: number;
  penaltyTimeRemaining: number;
  reason: string;
}

export interface ReadyCheck {
  declinerIds: any[];
  dodgeWarning: string;
  playerResponse: string;
  state: string;
  suppressUx: boolean;
  timer: number;
}
