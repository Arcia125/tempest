export type Remapped<T extends {}> = {
  [K in string | number]: T;
};

export type ErrorLike = Error | string | null;

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

export interface MatchHistoryDetails {
  /**
   * Please refer to the Game Constants documentation.
   */
  seasonId?: number;
  /**
   * Please refer to the Game Constants documentation.
   */
  queueId?: number;
  gameId?: number // int64
  /**
   * Participant identity information.
   */
  participantIdentities?: MatchV4ParticipantIdentityDTO[]
  /**
   * The major.minor version typically indicates the patch the match was played on.
   */
  gameVersion?: string
  /**
   * Platform where the match was played.
   */
  platformId?: string
  /**
   * Please refer to the Game Constants documentation.
   */
  gameMode?: string
  /**
   * Please refer to the Game Constants documentation.
   */
  mapId?: number;
  /**
   * Please refer to the Game Constants documentation.
   */
  gameType?: string
  /**
   * Team information.
   */
  teams?: MatchV4TeamStatsDTO[]
  /**
   * Participant information.
   */
  participants?: MatchV4ParticipantDTO[]
  /**
   * Match duration in seconds.
   */
  gameDuration?: number // int64
  /**
   * Designates the timestamp when champion select ended and the loading screen appeared, NOT when the game timer was at 0:00.
   */
  gameCreation?: number // int64
}

export interface MatchV4ParticipantIdentityDTO {
  /**
 * Player information.
 */
  player?: MatchV4PlayerDTO
  participantId?: number;
}

export interface MatchV4PlayerDTO {
  currentPlatformId?: string
  summonerName?: string
  matchHistoryUri?: string
  /**
   * Original platformId.
   */
  platformId?: string
  /**
   * Player's current accountId (Encrypted)
   */
  currentAccountId?: string
  profileIcon?: number;
  /**
   * Player's summonerId (Encrypted)
   */
  summonerId?: string
  /**
   * Player's original accountId (Encrypted)
   */
  accountId?: string
}

export interface MatchV4TeamStatsDTO {
  /**
   * Flag indicating whether or not the team scored the first Dragon kill.
   */
  firstDragon?: boolean;
  /**
   * Flag indicating whether or not the team destroyed the first inhibitor.
   */
  firstInhibitor?: boolean;
  /**
   * If match queueId has a draft, contains banned champion data, otherwise empty.
   */
  bans?: MatchV4TeamBansDTO[]
  /**
   * number of times the team killed Baron.
   */
  baronKills?: number;
  /**
   * Flag indicating whether or not the team scored the first Rift Herald kill.
   */
  firstRiftHerald?: boolean;
  /**
   * Flag indicating whether or not the team scored the first Baron kill.
   */
  firstBaron?: boolean;
  /**
   * number of times the team killed Rift Herald.
   */
  riftHeraldKills?: number;
  /**
   * Flag indicating whether or not the team scored the first blood.
   */
  firstBlood?: boolean;
  /**
   * 100 for blue side. 200 for red side.
   */
  teamId?: number;
  /**
   * Flag indicating whether or not the team destroyed the first tower.
   */
  firstTower?: boolean;
  /**
   * number of times the team killed Vilemaw.
   */
  vilemawKills?: number;
  /**
   * number of inhibitors the team destroyed.
   */
  inhibitorKills?: number;
  /**
   * number of towers the team destroyed.
   */
  towerKills?: number;
  /**
   * For Dominion matches, specifies the points the team had at game end.
   */
  dominionVictoryScore?: number;
  /**
   * String indicating whether or not the team won. There are only two values visibile in public match history.
   *              (Legal values:  Fail,  Win)
   */
  win?: 'Fail' | 'Win'
  /**
   * number of times the team killed Dragon.
   */
  dragonKills?: number;
}

export interface MatchV4ParticipantDTO {
  /**
   * Participant statistics.
   */
  stats?: MatchV4ParticipantStatsDTO
  participantId?: number // int32
  /**
   * List of legacy Rune information. Not included for matches played with Runes Reforged.
   */
  runes?: MatchV4RuneDTO[]
  /**
   * Participant timeline data.
   */
  timeline?: MatchV4ParticipantTimelineDTO
  /**
   * 100 for blue side. 200 for red side.
   */
  teamId?: number // int32
  /**
   * Second Summoner Spell id.
   */
  spell2Id?: number // int32
  /**
   * List of legacy Mastery information. Not included for matches played with Runes Reforged.
   */
  masteries?: MatchV4MasteryDTO[]
  /**
   * Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation.
   *              (Legal values:  CHALLENGER,  MASTER,  DIAMOND,  PLATINUM,  GOLD,  SILVER,  BRONZE,  UNRANKED)
   */
  highestAchievedSeasonTier?: 'CHALLENGER' | 'MASTER' | 'DIAMOND' | 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE' | 'UNRANKED'
  /**
   * First Summoner Spell id.
   */
  spell1Id?: number // int32
  championId?: number // int32
}

export interface MatchV4MasteryDTO {
  masteryId?: number // int32
  rank?: number // int32
}

export interface MatchV4ParticipantTimelineDTO {
  /**
   * Participant's calculated lane. MID and BOT are legacy values.
   *              (Legal values:  MID,  MIDDLE,  TOP,  JUNGLE,  BOT,  BOTTOM)
   */
  lane?: 'MID' | 'MIDDLE' | 'TOP' | 'JUNGLE' | 'BOT' | 'BOTTOM'
  participantId?: number // int32
  /**
   * Creep score difference versus the calculated lane opponent(s) for a specified period.
   */
  csDiffPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Gold for a specified period.
   */
  goldPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Experience difference versus the calculated lane opponent(s) for a specified period.
   */
  xpDiffPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Creeps for a specified period.
   */
  creepsPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Experience change for a specified period.
   */
  xpPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Participant's calculated role.
   *              (Legal values:  DUO,  NONE,  SOLO,  DUO_CARRY,  DUO_SUPPORT)
   */
  role?: 'DUO' | 'NONE' | 'SOLO' | 'DUO_CARRY' | 'DUO_SUPPORT'
  /**
   * Damage taken difference versus the calculated lane opponent(s) for a specified period.
   */
  damageTakenDiffPerMinDeltas?: {
    [name: string]: number // double
  }
  /**
   * Damage taken for a specified period.
   */
  damageTakenPerMinDeltas?: {
    [name: string]: number // double
  }
}

export interface MatchV4RuneDTO {
  runeId?: number // int32
  rank?: number // int32
}

export interface MatchV4ParticipantStatsDTO {
  firstBloodAssist?: boolean
  visionScore?: number // int64
  magicDamageDealtToChampions?: number // int64
  damageDealtToObjectives?: number // int64
  totalTimeCrowdControlDealt?: number // int32
  longestTimeSpentLiving?: number // int32
  /**
   * Post game rune stats.
   */
  perk1Var1?: number // int32
  /**
   * Post game rune stats.
   */
  perk1Var3?: number // int32
  /**
   * Post game rune stats.
   */
  perk1Var2?: number // int32
  tripleKills?: number // int32
  /**
   * Post game rune stats.
   */
  perk3Var3?: number // int32
  nodeNeutralizeAssist?: number // int32
  /**
   * Post game rune stats.
   */
  perk3Var2?: number // int32
  playerScore9?: number // int32
  playerScore8?: number // int32
  kills?: number // int32
  playerScore1?: number // int32
  playerScore0?: number // int32
  playerScore3?: number // int32
  playerScore2?: number // int32
  playerScore5?: number // int32
  playerScore4?: number // int32
  playerScore7?: number // int32
  playerScore6?: number // int32
  /**
   * Post game rune stats.
   */
  perk5Var1?: number // int32
  /**
   * Post game rune stats.
   */
  perk5Var3?: number // int32
  /**
   * Post game rune stats.
   */
  perk5Var2?: number // int32
  totalScoreRank?: number // int32
  neutralMinionsKilled?: number // int32
  damageDealtToTurrets?: number // int64
  physicalDamageDealtToChampions?: number // int64
  nodeCapture?: number // int32
  largestMultiKill?: number // int32
  /**
   * Post game rune stats.
   */
  perk2Var2?: number // int32
  /**
   * Post game rune stats.
   */
  perk2Var3?: number // int32
  totalUnitsHealed?: number // int32
  /**
   * Post game rune stats.
   */
  perk2Var1?: number // int32
  /**
   * Post game rune stats.
   */
  perk4Var1?: number // int32
  /**
   * Post game rune stats.
   */
  perk4Var2?: number // int32
  /**
   * Post game rune stats.
   */
  perk4Var3?: number // int32
  wardsKilled?: number // int32
  largestCriticalStrike?: number // int32
  largestKillingSpree?: number // int32
  quadraKills?: number // int32
  teamObjective?: number // int32
  magicDamageDealt?: number // int64
  item2?: number // int32
  item3?: number // int32
  item0?: number // int32
  neutralMinionsKilledTeamJungle?: number // int32
  item6?: number // int32
  item4?: number // int32
  item5?: number // int32
  /**
   * Primary path rune.
   */
  perk1?: number // int32
  /**
   * Primary path keystone rune.
   */
  perk0?: number // int32
  /**
   * Primary path rune.
   */
  perk3?: number // int32
  /**
   * Primary path rune.
   */
  perk2?: number // int32
  /**
   * Secondary path rune.
   */
  perk5?: number // int32
  /**
   * Secondary path rune.
   */
  perk4?: number // int32
  /**
   * Post game rune stats.
   */
  perk3Var1?: number // int32
  damageSelfMitigated?: number // int64
  magicalDamageTaken?: number // int64
  firstInhibitorKill?: boolean
  trueDamageTaken?: number // int64
  nodeNeutralize?: number // int32
  assists?: number // int32
  combatPlayerScore?: number // int32
  /**
   * Primary rune path
   */
  perkPrimaryStyle?: number // int32
  goldSpent?: number // int32
  trueDamageDealt?: number // int64
  participantId?: number // int32
  totalDamageTaken?: number // int64
  physicalDamageDealt?: number // int64
  sightWardsBoughtInGame?: number // int32
  totalDamageDealtToChampions?: number // int64
  physicalDamageTaken?: number // int64
  totalPlayerScore?: number // int32
  win?: boolean
  objectivePlayerScore?: number // int32
  totalDamageDealt?: number // int64
  item1?: number // int32
  neutralMinionsKilledEnemyJungle?: number // int32
  deaths?: number // int32
  wardsPlaced?: number // int32
  /**
   * Secondary rune path
   */
  perkSubStyle?: number // int32
  turretKills?: number // int32
  firstBloodKill?: boolean
  trueDamageDealtToChampions?: number // int64
  goldEarned?: number // int32
  killingSprees?: number // int32
  unrealKills?: number // int32
  altarsCaptured?: number // int32
  firstTowerAssist?: boolean
  firstTowerKill?: boolean
  champLevel?: number // int32
  doubleKills?: number // int32
  nodeCaptureAssist?: number // int32
  inhibitorKills?: number // int32
  firstInhibitorAssist?: boolean
  /**
   * Post game rune stats.
   */
  perk0Var1?: number // int32
  /**
   * Post game rune stats.
   */
  perk0Var2?: number // int32
  /**
   * Post game rune stats.
   */
  perk0Var3?: number // int32
  visionWardsBoughtInGame?: number // int32
  altarsNeutralized?: number // int32
  pentaKills?: number // int32
  totalHeal?: number // int64
  totalMinionsKilled?: number // int32
  timeCCingOthers?: number // int64
}

export interface MatchV4TeamBansDTO {
  /**
   * Turn during which the champion was banned.
   */
  pickTurn?: number;
  /**
   * Banned championId.
   */
  championId?: number;
}

export interface MatchHistory {
  matches: MatchHistoryItem[];
  startIndex: number;
  endIndex: number;
  totalGames: number;
}

export interface Entry {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface LeagueEntries {
  entries: Entry[];
}

export enum RiotImageType {
  SPLASH = 'splash',
  CHAMPION = 'champion',
  LOADING = 'loading',
  PASSIVE = 'passive',
  SPELL = 'spell',
  ITEM = 'item',
  PROFILEICON = 'profileicon',
  MAP = 'map',
  SPRITE = 'sprite',
  UI = 'ui'
}

export interface ChampionDTO {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number
    y: number;
    w: number;
    h: number;
  };
  tags: string[]
  partype: string,
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
}

export * as Lobby from './lobby';
