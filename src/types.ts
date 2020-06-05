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
  veteran: Boolean
  inactive: Boolean
  freshBlood: Boolean
  hotStreak: Boolean
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
    attack: Number;
    defense: Number;
    magic: Number;
    difficulty: Number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: Number
    y: Number;
    w: Number;
    h: Number;
  };
  tags: string[]
  partype: string,
  stats: {
    hp: Number;
    hpperlevel: Number;
    mp: Number;
    mpperlevel: Number;
    movespeed: Number;
    armor: Number;
    armorperlevel: Number;
    spellblock: Number;
    spellblockperlevel: Number;
    attackrange: Number;
    hpregen: Number;
    hpregenperlevel: Number;
    mpregen: Number;
    mpregenperlevel: Number;
    crit: Number;
    critperlevel: Number;
    attackdamage: Number;
    attackdamageperlevel: Number;
    attackspeedperlevel: Number;
    attackspeed: Number;
  };
}