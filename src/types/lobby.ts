import * as reducers from '../reducerTypes';

export interface GameConfig {
  allowablePremadeSizes: number[];
  customLobbyName: string;
  customMutatorName: string;
  customRewardsDisabledReasons: any[];
  customSpectatorPolicy: string;
  customSpectators: any[];
  customTeam100: any[];
  customTeam200: any[];
  gameMode: string;
  isCustom: boolean;
  isLobbyFull: boolean;
  isTeamBuilderManaged: boolean;
  mapId: number;
  maxHumanPlayers: number;
  maxLobbySize: number;
  maxTeamSize: number;
  pickType: string;
  premadeSizeAllowed: boolean;
  queueId: number;
  showPositionSelector: boolean;
}


export interface Invitation {
  invitationId: string;
  state: string;
  timestamp: string;
  toSummonerId: number;
  toSummonerName: string;
}


export interface LocalMember {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: string;
  botId: string;
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}


export interface Member {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: string;
  botId: string;
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}


export interface Data {
  canStartActivity?: boolean;
  chatRoomId?: string;
  chatRoomKey?: string;
  gameConfig?: GameConfig;
  invitations?: Invitation[];
  localMember?: LocalMember;
  members?: Member[];
  partyId?: string;
  partyType?: string;
  restrictions?: any[];
}


export enum ActionType {
  Update = 'Update',
  UpdateLobbyMembers = 'UpdateLobbyMembers'
}

export type ActionDispatcher = reducers.BaseActionDispatcher<ActionType>;

export type Action<D> = reducers.BaseAction<ActionType, D>;

export type Actions = reducers.BaseActions<ActionType>;
