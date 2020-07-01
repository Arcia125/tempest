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
