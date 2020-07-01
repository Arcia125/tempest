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
  PERKS = 'lol-perks',
  SUMMONER = 'lol-summoner'
}

interface LCUEndpoint {
  uri: string;
}

interface LCUPlugin {
  name: LCUPluginEvent;
  baseUri: string;
  endpoints: Record<string, LCUEndpoint>;
}

export const lcuPlugins: { [s: string]: LCUPlugin } = {
  matchMaking: {
    name: LCUPluginEvent.MATCHMAKING,
    baseUri: '/lol-matchmaking/v1/', endpoints: {

    }
  },
  champSelect: {
    name: LCUPluginEvent.CHAMP_SELECT,
    baseUri: '/lol-champ-select/v1/', endpoints: {

    }
  },
  gameflow: {
    name: LCUPluginEvent.GAMEFLOW,
    baseUri: '/lol-gameflow/v1/', endpoints: {

    }
  },
  patch: {
    name: LCUPluginEvent.PATCH,
    baseUri: '/lol-patch/v1/', endpoints: {

    }
  },
  patcher: {
    name: LCUPluginEvent.PATCHER,
    baseUri: '/patcher/v1/', endpoints: {

    }
  },
  gameClientChat: {
    name: LCUPluginEvent.GAME_CLIENT_CHAT,
    baseUri: '/lol-game-client-chat/v1/', endpoints: {

    }
  },
  chat: {
    name: LCUPluginEvent.CHAT,
    baseUri: '/lol-chat/v1/', endpoints: {

    }
  },
  hovercard: {
    name: LCUPluginEvent.HOVERCARD,
    baseUri: '/lol-hovercard/v1/', endpoints: {

    }
  },
  clubsPublic: {
    name: LCUPluginEvent.CLUBS_PUBLIC,
    baseUri: '/lol-clubs-public/v1/', endpoints: {

    }
  },
  suggestedPlayers: {
    name: LCUPluginEvent.SUGGESTED_PLAYERS,
    baseUri: 'lol-suggested-players', endpoints: {

    }
  },
  lobby: {
    name: LCUPluginEvent.LOBBY,
    baseUri: '/lol-lobby/v2/', endpoints: {

    }
  },
  lobbyTeamBuilder: {
    name: LCUPluginEvent.LOBBY_TEAM_BUILDER,
    baseUri: '/lol-lobby-team-builder/v1/', endpoints: {

    }
  },
  clash: {
    name: LCUPluginEvent.CLASH,
    baseUri: '/lol-clash/v1/', endpoints: {

    }
  },
  perks: {
    name: LCUPluginEvent.PERKS,
    baseUri: '/lol-perks/v1/', endpoints: {
    }
  },
  summoner: {
    name: LCUPluginEvent.SUMMONER,
    baseUri: '/lol-summoner/v1/', endpoints: {
      currentSummoner: {
        uri: '/lol-summoner/v1/current-summoner'
      }
    }
  },
};