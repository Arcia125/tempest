const log = typeof window !== 'undefined' && window.require ? window.require('electron-log') : typeof require !== 'undefined' ? require('electron-log') : {
  ...console,
  info: console.log,
  silly: console.log,
};

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
// interface LCUEndpoint {
//   uri: string;
//   method: ;
// }
// 
// 
// interface LCUPluginConfig {
//   name: LCUPluginEvent;
//   baseUri: string;
//   endpoints: Record<string | 'currentSummoner', LCUEndpoint>;
// }
// 
// type PluginName = 'matchMaking' | 'champSelect' | 'gameflow' | 'patch' | 'patcher' | 'gameClientChat' | 'chat' | 'hovercard' | 'clubsPublic' | 'suggestedPlayers' | 'lobby' | 'lobbyTeamBuilder' | 'clash' | 'perks' | 'summoner';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

type Methods = keyof Method;

export const lcuPlugins = {
  matchMaking: {
    name: LCUPluginEvent.MATCHMAKING,
    baseUri: '/lol-matchmaking/v1/', endpoints: {
      readyCheck: {
        uri: 'ready-check',
        method: Method.GET,
      },
      readyCheckAccept: {
        uri: 'ready-check/accept',
        method: Method.POST
      },
      readyCheckDecline: {
        uri: 'ready-check/decline',
        method: Method.POST
      },
      search: {
        uri: 'search',
        method: Method.PUT
      },
    }
  },
  // champSelect: {
  //   name: LCUPluginEvent.CHAMP_SELECT,
  //   baseUri: '/lol-champ-select/v1/', endpoints: {

  //   }
  // },
  // gameflow: {
  //   name: LCUPluginEvent.GAMEFLOW,
  //   baseUri: '/lol-gameflow/v1/', endpoints: {

  //   }
  // },
  // patch: {
  //   name: LCUPluginEvent.PATCH,
  //   baseUri: '/lol-patch/v1/', endpoints: {

  //   }
  // },
  // patcher: {
  //   name: LCUPluginEvent.PATCHER,
  //   baseUri: '/patcher/v1/', endpoints: {

  //   }
  // },
  // gameClientChat: {
  //   name: LCUPluginEvent.GAME_CLIENT_CHAT,
  //   baseUri: '/lol-game-client-chat/v1/', endpoints: {

  //   }
  // },
  // chat: {
  //   name: LCUPluginEvent.CHAT,
  //   baseUri: '/lol-chat/v1/', endpoints: {

  //   }
  // },
  // hovercard: {
  //   name: LCUPluginEvent.HOVERCARD,
  //   baseUri: '/lol-hovercard/v1/', endpoints: {

  //   }
  // },
  // clubsPublic: {
  //   name: LCUPluginEvent.CLUBS_PUBLIC,
  //   baseUri: '/lol-clubs-public/v1/', endpoints: {

  //   }
  // },
  // suggestedPlayers: {
  //   name: LCUPluginEvent.SUGGESTED_PLAYERS,
  //   baseUri: 'lol-suggested-players', endpoints: {

  //   }
  // },
  // lobby: {
  //   name: LCUPluginEvent.LOBBY,
  //   baseUri: '/lol-lobby/v2/', endpoints: {

  //   }
  // },
  // lobbyTeamBuilder: {
  //   name: LCUPluginEvent.LOBBY_TEAM_BUILDER,
  //   baseUri: '/lol-lobby-team-builder/v1/', endpoints: {

  //   }
  // },
  // clash: {
  //   name: LCUPluginEvent.CLASH,
  //   baseUri: '/lol-clash/v1/', endpoints: {

  //   }
  // },
  // perks: {
  //   name: LCUPluginEvent.PERKS,
  //   baseUri: '/lol-perks/v1/', endpoints: {
  //   }
  // },
  summoner: {
    name: LCUPluginEvent.SUMMONER,
    baseUri: '/lol-summoner/v1/', endpoints: {
      currentSummoner: {
        uri: 'current-summoner',
        method: Method.GET
      }
    }
  },
};

type LCUPluginsKeys = keyof typeof lcuPlugins;

export type LCUPlugin = typeof lcuPlugins[LCUPluginsKeys];

export type LCUPluginKey = LCUPluginEvent | LCUPluginsKeys;

export type LCUEndpoints = LCUPlugin["endpoints"];

export type EndpointKey = keyof LCUEndpoints;

export type LCUEndpoint = LCUEndpoints[EndpointKey] & { uri: string; method: Methods };

export const getPlugin = (pluginKey: LCUPluginKey): LCUPlugin => {
  let plugin;
  if (pluginKey in LCUPluginEvent) plugin = Object.values(lcuPlugins).find(plugin => plugin.name === pluginKey);
  else if (pluginKey in lcuPlugins) plugin = lcuPlugins[pluginKey as keyof typeof lcuPlugins];
  if (!plugin) log.error(new Error(`Invalid pluginKey ${pluginKey}`));
  return plugin as LCUPlugin;
};

export const getEndpoint = (plugin: LCUPlugin, endpointKey: EndpointKey): LCUEndpoint => {
  const endpoint = plugin.endpoints[endpointKey];
  if (endpoint == null) log.error(new Error(`Invalid endpointKey ${endpointKey}`));
  return endpoint;
}

export const getRequestArgs = (pluginKey: LCUPluginKey, endpointKey: EndpointKey, options: Partial<RequestInit>): [string, RequestInit] => {
  const plugin = getPlugin(pluginKey);
  const endpoint = getEndpoint(plugin, endpointKey) as { uri: string; method: Methods };
  const endpointUri = `${plugin.baseUri}${endpoint.uri}`;
  return [endpointUri, {
    ...options,
    method: endpoint.method as string
  }];
  // `${plugin.baseUri}${}`
};
