
export enum LCUPluginEvent {
  MATCHMAKING = 'lol-matchmaking',
  CHAMP_SELECT = 'lol-champ-select',
  GAMEFLOW = 'lol-gameflow',
  PATCH = 'lol-patch',
  PATCHER = 'patcher',
  GAME_CLIENT_CHAT = 'lol-game-client-chat',
  CHAT = 'lol-chat',
  HOVERCARD = 'lol-hovercard',
  CLUBS_PUBLIC = 'lol-clubs-public',
  SUGGESTED_PLAYERS = 'lol-suggested-players',
  LOBBY = 'lol-lobby',
  LOBBY_TEAM_BUILDER = 'lol-lobby-team-builder',
  CLASH = 'lol-clash',
  PERKS = 'lol-perks'
}

interface LCUEvent {
  baseUri: string
}

export const LCUPluginEvents: Record<LCUPluginEvent, LCUEvent> = {
  [LCUPluginEvent.MATCHMAKING]: { baseUri: '/lol-matchmaking/v1/' },
  [LCUPluginEvent.CHAMP_SELECT]: { baseUri: '/lol-champ-select/v1/' },
  [LCUPluginEvent.GAMEFLOW]: { baseUri: '/lol-gameflow/v1/' },
  [LCUPluginEvent.PATCH]: { baseUri: '/lol-patch/v1/' },
  [LCUPluginEvent.PATCHER]: { baseUri: '/patcher/v1/' },
  [LCUPluginEvent.GAME_CLIENT_CHAT]: { baseUri: '/lol-game-client-chat/v1/' },
  [LCUPluginEvent.CHAT]: { baseUri: '/lol-chat/v1/' },
  [LCUPluginEvent.HOVERCARD]: { baseUri: '/lol-hovercard/v1/' },
  [LCUPluginEvent.CLUBS_PUBLIC]: { baseUri: '/lol-clubs-public/v1/' },
  [LCUPluginEvent.SUGGESTED_PLAYERS]: { baseUri: 'lol-suggested-players' },
  [LCUPluginEvent.LOBBY]: { baseUri: '/lol-lobby/v2/' },
  [LCUPluginEvent.LOBBY_TEAM_BUILDER]: { baseUri: '/lol-lobby-team-builder/v1/' },
  [LCUPluginEvent.CLASH]: { baseUri: '/lol-clash/v1/' },
  [LCUPluginEvent.PERKS]: { baseUri: '/lol-perks/v1/' },
};