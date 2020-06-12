import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  info: Scalars['String'];
  summoner?: Maybe<Summoner>;
  currentGame?: Maybe<Scalars['String']>;
};

export type QuerySummonerArgs = {
  username?: Maybe<Scalars['String']>;
};

export type QueryCurrentGameArgs = {
  summonerId?: Maybe<Scalars['ID']>;
};

export type Summoner = {
  __typename?: 'Summoner';
  id?: Maybe<Scalars['ID']>;
  accountId?: Maybe<Scalars['ID']>;
  puuid?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  profileIconId?: Maybe<Scalars['Int']>;
  revisionDate?: Maybe<Scalars['Int']>;
  summonerLevel?: Maybe<Scalars['Int']>;
  matchHistory?: Maybe<MatchHistory>;
  leagueEntries?: Maybe<Array<Maybe<LeagueEntry>>>;
};

export type MatchHistory = {
  __typename?: 'MatchHistory';
  matches?: Maybe<Array<Maybe<MatchHistoryItem>>>;
  startIndex?: Maybe<Scalars['Int']>;
  endIndex?: Maybe<Scalars['Int']>;
  totalGames?: Maybe<Scalars['Int']>;
};

export type MatchHistoryItem = {
  __typename?: 'MatchHistoryItem';
  platformId?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['Int']>;
  champion?: Maybe<Scalars['Int']>;
  queue?: Maybe<Scalars['Int']>;
  season?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
  lane?: Maybe<Scalars['String']>;
  details?: Maybe<MatchDetails>;
};

export type MatchDetails = {
  __typename?: 'MatchDetails';
  seasonId?: Maybe<Scalars['Int']>;
  queueId?: Maybe<Scalars['Int']>;
  gameId?: Maybe<Scalars['Int']>;
  participantIdentities?: Maybe<Array<Maybe<MatchParticipantIdentity>>>;
  gameVersion?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  gameMode?: Maybe<Scalars['String']>;
  mapId?: Maybe<Scalars['Int']>;
  gameType?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<MatchTeamStats>>>;
  participants?: Maybe<Array<Maybe<MatchParticipant>>>;
  /** Match duration in seconds. */
  gameDuration?: Maybe<Scalars['Int']>;
  /** Designates the timestamp when champion select ended and the loading screen appeared, NOT when the game timer was at 0:00. */
  gameCreation?: Maybe<Scalars['Int']>;
};

export type MatchParticipantIdentity = {
  __typename?: 'MatchParticipantIdentity';
  player?: Maybe<MatchPlayer>;
  participantId?: Maybe<Scalars['Int']>;
};

export type MatchPlayer = {
  __typename?: 'MatchPlayer';
  currentPlatformId?: Maybe<Scalars['ID']>;
  summonerName?: Maybe<Scalars['String']>;
  matchHistoryUri?: Maybe<Scalars['String']>;
  /** Original platformId. */
  platformId?: Maybe<Scalars['ID']>;
  /** Player's current accountId (Encrypted) */
  currentAccountId?: Maybe<Scalars['ID']>;
  profileIcon?: Maybe<Scalars['Int']>;
  /** Player's summonerId (Encrypted) */
  summonerId?: Maybe<Scalars['ID']>;
  /** Player's original accountId (Encrypted) */
  accountId?: Maybe<Scalars['ID']>;
};

export type MatchParticipant = {
  __typename?: 'MatchParticipant';
  /** Participant statistics. */
  stats?: Maybe<MatchParticipantStats>;
  participantId?: Maybe<Scalars['Int']>;
  /** List of legacy Rune information. Not included for matches played with Runes Reforged. */
  runes?: Maybe<Array<Maybe<MatchRunes>>>;
  /** Participant timeline data. */
  timeline?: Maybe<MatchParticipantTimeline>;
  /** 100 for blue side. 200 for red side */
  teamId?: Maybe<Scalars['Int']>;
  /** First summoner spell id */
  spell1Id?: Maybe<Scalars['ID']>;
  /** Second summoner spell id */
  spell2Id?: Maybe<Scalars['ID']>;
  /** List of legacy Mastery information. Not included for matches played with Runes Reforged. */
  masteries?: Maybe<Array<Maybe<MatchMastery>>>;
  /** Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation. */
  highestAchievedSeasonTier?: Maybe<RankedTier>;
  championId?: Maybe<Scalars['ID']>;
};

export enum RankedTier {
  Challenger = 'CHALLENGER',
  Master = 'MASTER',
  Diamond = 'DIAMOND',
  Platinum = 'PLATINUM',
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
  Iron = 'IRON',
  Unranked = 'UNRANKED',
}

export type MatchParticipantStats = {
  __typename?: 'MatchParticipantStats';
  firstBloodAssist?: Maybe<Scalars['Boolean']>;
  visionScore?: Maybe<Scalars['Int']>;
  magicDamageDealtToChampions?: Maybe<Scalars['Int']>;
  damageDealtToObjectives?: Maybe<Scalars['Int']>;
  totalTimeCrowdControlDealt?: Maybe<Scalars['Int']>;
  longestTimeSpentLiving?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk1Var1?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk1Var3?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk1Var2?: Maybe<Scalars['Int']>;
  tripleKills?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk3Var3?: Maybe<Scalars['Int']>;
  nodeNeutralizeAssist?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk3Var2?: Maybe<Scalars['Int']>;
  playerScore9?: Maybe<Scalars['Int']>;
  playerScore8?: Maybe<Scalars['Int']>;
  kills?: Maybe<Scalars['Int']>;
  playerScore1?: Maybe<Scalars['Int']>;
  playerScore0?: Maybe<Scalars['Int']>;
  playerScore3?: Maybe<Scalars['Int']>;
  playerScore2?: Maybe<Scalars['Int']>;
  playerScore5?: Maybe<Scalars['Int']>;
  playerScore4?: Maybe<Scalars['Int']>;
  playerScore7?: Maybe<Scalars['Int']>;
  playerScore6?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk5Var1?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk5Var3?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk5Var2?: Maybe<Scalars['Int']>;
  totalScoreRank?: Maybe<Scalars['Int']>;
  neutralMinionsKilled?: Maybe<Scalars['Int']>;
  damageDealtToTurrets?: Maybe<Scalars['Int']>;
  physicalDamageDealtToChampions?: Maybe<Scalars['Int']>;
  nodeCapture?: Maybe<Scalars['Int']>;
  largestMultiKill?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk2Var2?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk2Var3?: Maybe<Scalars['Int']>;
  totalUnitsHealed?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk2Var1?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk4Var1?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk4Var2?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk4Var3?: Maybe<Scalars['Int']>;
  wardsKilled?: Maybe<Scalars['Int']>;
  largestCriticalStrike?: Maybe<Scalars['Int']>;
  largestKillingSpree?: Maybe<Scalars['Int']>;
  quadraKills?: Maybe<Scalars['Int']>;
  teamObjective?: Maybe<Scalars['Int']>;
  magicDamageDealt?: Maybe<Scalars['Int']>;
  item2?: Maybe<Scalars['Int']>;
  item3?: Maybe<Scalars['Int']>;
  item0?: Maybe<Scalars['Int']>;
  neutralMinionsKilledTeamJungle?: Maybe<Scalars['Int']>;
  item6?: Maybe<Scalars['Int']>;
  item4?: Maybe<Scalars['Int']>;
  item5?: Maybe<Scalars['Int']>;
  /** Primary path rune. */
  perk1?: Maybe<Scalars['Int']>;
  /** Primary path keystone rune. */
  perk0?: Maybe<Scalars['Int']>;
  /** Primary path rune. */
  perk3?: Maybe<Scalars['Int']>;
  /** Primary path rune. */
  perk2?: Maybe<Scalars['Int']>;
  /** Secondary path rune. */
  perk5?: Maybe<Scalars['Int']>;
  /** Secondary path rune. */
  perk4?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk3Var1?: Maybe<Scalars['Int']>;
  damageSelfMitigated?: Maybe<Scalars['Int']>;
  magicalDamageTaken?: Maybe<Scalars['Int']>;
  firstInhibitorKill?: Maybe<Scalars['Boolean']>;
  trueDamageTaken?: Maybe<Scalars['Int']>;
  nodeNeutralize?: Maybe<Scalars['Int']>;
  assists?: Maybe<Scalars['Int']>;
  combatPlayerScore?: Maybe<Scalars['Int']>;
  /** Primary rune path */
  perkPrimaryStyle?: Maybe<Scalars['Int']>;
  goldSpent?: Maybe<Scalars['Int']>;
  trueDamageDealt?: Maybe<Scalars['Int']>;
  participantId?: Maybe<Scalars['Int']>;
  totalDamageTaken?: Maybe<Scalars['Int']>;
  physicalDamageDealt?: Maybe<Scalars['Int']>;
  sightWardsBoughtInGame?: Maybe<Scalars['Int']>;
  totalDamageDealtToChampions?: Maybe<Scalars['Int']>;
  physicalDamageTaken?: Maybe<Scalars['Int']>;
  totalPlayerScore?: Maybe<Scalars['Int']>;
  win?: Maybe<Scalars['Boolean']>;
  objectivePlayerScore?: Maybe<Scalars['Int']>;
  totalDamageDealt?: Maybe<Scalars['Int']>;
  item1?: Maybe<Scalars['Int']>;
  neutralMinionsKilledEnemyJungle?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  wardsPlaced?: Maybe<Scalars['Int']>;
  /** Secondary rune path */
  perkSubStyle?: Maybe<Scalars['Int']>;
  turretKills?: Maybe<Scalars['Int']>;
  firstBloodKill?: Maybe<Scalars['Boolean']>;
  trueDamageDealtToChampions?: Maybe<Scalars['Int']>;
  goldEarned?: Maybe<Scalars['Int']>;
  killingSprees?: Maybe<Scalars['Int']>;
  unrealKills?: Maybe<Scalars['Int']>;
  altarsCaptured?: Maybe<Scalars['Int']>;
  firstTowerAssist?: Maybe<Scalars['Boolean']>;
  firstTowerKill?: Maybe<Scalars['Boolean']>;
  champLevel?: Maybe<Scalars['Int']>;
  doubleKills?: Maybe<Scalars['Int']>;
  nodeCaptureAssist?: Maybe<Scalars['Int']>;
  inhibitorKills?: Maybe<Scalars['Int']>;
  firstInhibitorAssist?: Maybe<Scalars['Boolean']>;
  /** Post game rune stats. */
  perk0Var1?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk0Var2?: Maybe<Scalars['Int']>;
  /** Post game rune stats. */
  perk0Var3?: Maybe<Scalars['Int']>;
  visionWardsBoughtInGame?: Maybe<Scalars['Int']>;
  altarsNeutralized?: Maybe<Scalars['Int']>;
  pentaKills?: Maybe<Scalars['Int']>;
  totalHeal?: Maybe<Scalars['Int']>;
  totalMinionsKilled?: Maybe<Scalars['Int']>;
  timeCCingOthers?: Maybe<Scalars['Int']>;
};

export type MatchRunes = {
  __typename?: 'MatchRunes';
  runeId?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
};

export type MatchParticipantTimeline = {
  __typename?: 'MatchParticipantTimeline';
  /** Participant's calculated lane. MID and BOT are legacy values. (Legal values:  MID,  MIDDLE,  TOP,  JUNGLE,  BOT,  BOTTOM) */
  lane?: Maybe<Lane>;
  participantId?: Maybe<Scalars['Int']>;
  /** Creep score difference versus the calculated lane opponent(s) for a specified period. */
  csDiffPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Gold for a specified period. */
  goldPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Experience difference versus the calculated lane opponent(s) for a specified period. */
  xpDiffPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Creeps for a specified period. */
  creepsPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Experience change for a specified period. */
  xpPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Participant's calculated role. (Legal values:  DUO,  NONE,  SOLO,  DUO_CARRY,  DUO_SUPPORT) */
  role?: Maybe<Role>;
  /** Damage taken difference versus the calculated lane opponent(s) for a specified period. */
  damageTakenDiffPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
  /** Damage taken for a specified period. */
  damageTakenPerMinDeltas?: Maybe<Array<Maybe<Delta>>>;
};

export enum Lane {
  /** legacy */
  Mid = 'MID',
  Middle = 'MIDDLE',
  Top = 'TOP',
  Jungle = 'JUNGLE',
  /** legacy */
  Bot = 'BOT',
  Bottom = 'BOTTOM',
}

export enum Role {
  Duo = 'DUO',
  None = 'NONE',
  Solo = 'SOLO',
  DuoCarry = 'DUO_CARRY',
  DuoSupport = 'DUO_SUPPORT',
}

export type Delta = {
  __typename?: 'Delta';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MatchMastery = {
  __typename?: 'MatchMastery';
  masteryId?: Maybe<Scalars['ID']>;
  rank?: Maybe<Scalars['Int']>;
};

export type MatchTeamStats = {
  __typename?: 'MatchTeamStats';
  firstDragon?: Maybe<Scalars['Boolean']>;
  firstInhibitor?: Maybe<Scalars['Boolean']>;
  bans?: Maybe<Array<Maybe<MatchTeamBan>>>;
  baronKills?: Maybe<Scalars['Int']>;
  firstRiftHerald?: Maybe<Scalars['Boolean']>;
  riftHeraldKills?: Maybe<Scalars['Int']>;
  firstBlood?: Maybe<Scalars['Boolean']>;
  teamId?: Maybe<Scalars['Int']>;
  firstTower?: Maybe<Scalars['Boolean']>;
  vilemawKills?: Maybe<Scalars['Int']>;
  inhibitorKills?: Maybe<Scalars['Int']>;
  towerKills?: Maybe<Scalars['Int']>;
  dominionVictoryScore?: Maybe<Scalars['Int']>;
  win?: Maybe<GameOutcome>;
  dragonKills?: Maybe<Scalars['Int']>;
};

export type MatchTeamBan = {
  __typename?: 'MatchTeamBan';
  pickTurn?: Maybe<Scalars['Int']>;
  championId?: Maybe<Scalars['Int']>;
};

export enum GameOutcome {
  Fail = 'Fail',
  Win = 'Win',
}

export type LeagueEntry = {
  __typename?: 'LeagueEntry';
  leagueId?: Maybe<Scalars['String']>;
  queueType?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['String']>;
  summonerId?: Maybe<Scalars['ID']>;
  summonerName?: Maybe<Scalars['String']>;
  leaguePoints?: Maybe<Scalars['Int']>;
  wins?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  veteran?: Maybe<Scalars['Boolean']>;
  inactive?: Maybe<Scalars['Boolean']>;
  freshBlood?: Maybe<Scalars['Boolean']>;
  hotStreak?: Maybe<Scalars['Boolean']>;
};

export type SummonerQueryVariables = {
  username: Scalars['String'];
};

export type SummonerQuery = { __typename?: 'Query' } & {
  summoner?: Maybe<
    { __typename?: 'Summoner' } & Pick<
      Summoner,
      'id' | 'name' | 'profileIconId' | 'summonerLevel'
    > & {
        leagueEntries?: Maybe<
          Array<
            Maybe<
              { __typename?: 'LeagueEntry' } & Pick<
                LeagueEntry,
                'tier' | 'rank' | 'queueType'
              >
            >
          >
        >;
        matchHistory?: Maybe<
          { __typename?: 'MatchHistory' } & {
            matches?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'MatchHistoryItem' } & Pick<
                    MatchHistoryItem,
                    'queue' | 'champion'
                  > & {
                      details?: Maybe<
                        { __typename?: 'MatchDetails' } & Pick<
                          MatchDetails,
                          'gameDuration' | 'gameMode'
                        > & {
                            participantIdentities?: Maybe<
                              Array<
                                Maybe<
                                  {
                                    __typename?: 'MatchParticipantIdentity';
                                  } & Pick<
                                    MatchParticipantIdentity,
                                    'participantId'
                                  > & {
                                      player?: Maybe<
                                        { __typename?: 'MatchPlayer' } & Pick<
                                          MatchPlayer,
                                          'summonerId'
                                        >
                                      >;
                                    }
                                >
                              >
                            >;
                            participants?: Maybe<
                              Array<
                                Maybe<
                                  { __typename?: 'MatchParticipant' } & Pick<
                                    MatchParticipant,
                                    'participantId' | 'teamId'
                                  > & {
                                      stats?: Maybe<
                                        {
                                          __typename?: 'MatchParticipantStats';
                                        } & Pick<
                                          MatchParticipantStats,
                                          | 'kills'
                                          | 'deaths'
                                          | 'assists'
                                          | 'totalMinionsKilled'
                                        >
                                      >;
                                    }
                                >
                              >
                            >;
                            teams?: Maybe<
                              Array<
                                Maybe<
                                  { __typename?: 'MatchTeamStats' } & Pick<
                                    MatchTeamStats,
                                    'win' | 'teamId'
                                  >
                                >
                              >
                            >;
                          }
                      >;
                    }
                >
              >
            >;
          }
        >;
      }
  >;
};

export const SummonerDocument = gql`
  query Summoner($username: String!) {
    summoner(username: $username) {
      id
      name
      profileIconId
      summonerLevel
      leagueEntries {
        tier
        rank
        queueType
      }
      matchHistory {
        matches {
          queue
          champion
          details {
            gameDuration
            gameMode
            participantIdentities {
              participantId
              player {
                summonerId
              }
            }
            participants {
              participantId
              teamId
              stats {
                kills
                deaths
                assists
                totalMinionsKilled
              }
            }
            teams {
              win
              teamId
            }
          }
        }
      }
    }
  }
`;

/**
 * __useSummonerQuery__
 *
 * To run a query within a React component, call `useSummonerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSummonerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSummonerQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSummonerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SummonerQuery,
    SummonerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SummonerQuery, SummonerQueryVariables>(
    SummonerDocument,
    baseOptions
  );
}
export function useSummonerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SummonerQuery,
    SummonerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SummonerQuery, SummonerQueryVariables>(
    SummonerDocument,
    baseOptions
  );
}
export type SummonerQueryHookResult = ReturnType<typeof useSummonerQuery>;
export type SummonerLazyQueryHookResult = ReturnType<
  typeof useSummonerLazyQuery
>;
export type SummonerQueryResult = ApolloReactCommon.QueryResult<
  SummonerQuery,
  SummonerQueryVariables
>;
